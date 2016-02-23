function lcs_bv() {

  // The number of bits in an int.
  this.width = 32;
}

/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
lcs_bv.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << i;
  }
  return s;
};

lcs_bv.prototype.lcs2html = function(X,Y,LCS) {

  var lines = {
    "indexX":"<tr><td>index1</td>",
    "charX": "<tr><td>text 1</td>",
    "match": "<tr><td>match?</td>",
    "charY": "<tr><td>text 2</td>",
    "indexY":"<tr><td>index2</td>",
  };

  var Xcurrent = -1;
  var Ycurrent = -1;
  var Xtemp;
  var Ytemp;

  //for my $hunk (@$LCS) {
  for (var i=0; i<LCS.length;i++) {
    var hunk = LCS[i];
    while ( (Xcurrent+1 < hunk[0] ||  Ycurrent+1 < hunk[1]) ) {
      Xtemp = '';
      Ytemp = '';
      if (Xcurrent+1 < hunk[0]) {
        Xcurrent++;
        Xtemp = X.charAt(Xcurrent);
      }
      if (Ycurrent+1 < hunk[1]) {
        Ycurrent++;
        Ytemp = Y.charAt(Ycurrent);
      }
      //lines.push([Xtemp,Ytemp]);
      lines["indexX"] += (Xtemp == '') ? '<td>'+''+'</td>' : '<td>'+Xcurrent+'</td>';
      lines["charX"] += '<td>'+Xtemp+'</td>';
      lines["match"] += '<td>'+''+'</td>';
      lines["charY"] += '<td>'+Ytemp+'</td>';
      lines["indexY"] += (Ytemp == '') ? '<td>'+''+'</td>' : '<td>'+Ycurrent+'</td>';
    }

    Xcurrent = hunk[0];
    Ycurrent = hunk[1];
    //lines.push([X.charAt(Xcurrent),Y.charAt(Ycurrent)]);
      lines["indexX"] += '<td>'+Xcurrent+'</td>';
      lines["charX"] += '<td class="match">'+X.charAt(Xcurrent)+'</td>';
      lines["match"] += '<td>'+'|'+'</td>';
      lines["charY"] += '<td class="match">'+Y.charAt(Ycurrent)+'</td>';
      lines["indexY"] += '<td>'+Ycurrent+'</td>';  }
  while ( (Xcurrent+1 <= X.length-1 ||  Ycurrent+1 <= Y.length-1) ) {
    $Xtemp = '';
    $Ytemp = '';
    if (Xcurrent+1 <= X.length-1) {
      Xcurrent++;
      Xtemp = X.charAt(Xcurrent);
    }
    if (Ycurrent+1 <= Y.length-1) {
      Ycurrent++;
      Ytemp = Y.charAt(Ycurrent);
    }
    //lines.push([Xtemp,Ytemp]);
      lines["indexX"] += (Xtemp == '') ? '<td>'+''+'</td>' : '<td>'+Xcurrent+'</td>';
      lines["charX"] += '<td>'+Xtemp+'</td>';
      lines["match"] += '<td>'+''+'</td>';
      lines["charY"] += '<td>'+Ytemp+'</td>';
      lines["indexY"] += (Ytemp == '') ? '<td>'+''+'</td>' : '<td>'+Ycurrent+'</td>';    
  }
  var html = 
    lines["indexX"] + '</tr>'
    + lines["charX"] + '</tr>'
    + lines["match"] + '</tr>'
    + lines["charY"] + '</tr>'
    + lines["indexY"] + '</tr>';
  return html;
};

lcs_bv.prototype.bpm2html = function(X,Y,LCS) {

  var lines = {
    "indexX":"<tr><td>index1</td>",
    "charX": "<tr><td>text 1</td>",
    "match": "<tr><td>match?</td>",
    "charY": "<tr><td>text 2</td>",
    "indexY":"<tr><td>index2</td>",
  };

  //for my $hunk (@$LCS) {
  for (var i=0; i<LCS.length;i++) {
      var hunk = LCS[i];
      var Xtemp = (hunk[0] < 0) ? '' : X.charAt(hunk[0]);
      var Ytemp = (hunk[1] < 0) ? '' : Y.charAt(hunk[1]);
      var MatchClass = (Xtemp == Ytemp) ? ' class="match"' : '';
      var MatchChar = (Xtemp == Ytemp) ? '|' : '';
      //lines.push([Xtemp,Ytemp]);
      lines["indexX"] += (hunk[0] < 0) ? '<td>'+''+'</td>' : '<td>'+ hunk[0] +'</td>';
      lines["charX"] += '<td ' + MatchClass +'>'+Xtemp+'</td>';
      lines["match"] += '<td>'+MatchChar+'</td>';
      lines["charY"] += '<td ' + MatchClass +'>'+Ytemp+'</td>';
      lines["indexY"] += (hunk[1] < 0) ? '<td>'+''+'</td>' : '<td>'+ hunk[1] +'</td>';
  }
  
  var html = 
    lines["indexX"] + '</tr>'
    + lines["charX"] + '</tr>'
    + lines["match"] + '</tr>'
    + lines["charY"] + '</tr>'
    + lines["indexY"] + '</tr>';
  return html;
};


lcs_bv.prototype.lcs2align = function(X,Y,LCS) {

  var hunks = [];

  var Xcurrent = -1;
  var Ycurrent = -1;
  var Xtemp;
  var Ytemp;

  //for my $hunk (@$LCS) {
  for (var i=0; i<LCS.length;i++) {
    var hunk = LCS[i];
    while ( (Xcurrent+1 < hunk[0] ||  Ycurrent+1 < hunk[1]) ) {
      Xtemp = '';
      Ytemp = '';
      if (Xcurrent+1 < hunk[0]) {
        Xcurrent++;
        Xtemp = X[Xcurrent];
      }
      if (Ycurrent+1 < hunk[1]) {
        Ycurrent++;
        Ytemp = Y[Ycurrent];
      }
      hunks.push([Xtemp,Ytemp]);
    }

    Xcurrent = hunk[0];
    Ycurrent = hunk[1];
    hunks.push([X.charAt(Xcurrent),Y.charAt(Ycurrent)]);
  }
  while ( (Xcurrent+1 <= X.length-1 ||  Ycurrent+1 <= Y.length-1) ) {
    $Xtemp = '';
    $Ytemp = '';
    if (Xcurrent+1 <= X.length-1) {
      Xcurrent++;
      Xtemp = X.charAt(Xcurrent);
    }
    if (Ycurrent+1 <= Y.length-1) {
      Ycurrent++;
      Ytemp = Y.charAt(Ycurrent);
    }
    hunks.push([Xtemp,Ytemp]);
  }
  return hunks;

};

lcs_bv.prototype.LCS = function(a,b) {

  var amin = 0;
  var amax = a.length;
  var bmin = 0;
  var bmax = b.length;

  var positions = this.match_alphabet_(a);
  var lcs = [];

  var S = ~0;

  var Vs = []; // ~VP
  var VPs = []; // VP
  var y;
  var u;

  for (var j = bmin; j <= bmax; j++) { 
      y = (b.charAt(j) in positions) ? positions[b.charAt(j)] : 0;
      u = S & y;               
      S = (S + u) | (S - u); 
      Vs[j] = S;
      VPs[j] = ~S;
  }
  return this.backtrace(Vs,VPs,amax,bmax);
}

lcs_bv.prototype.BPM = function(a,b) {

  var amin = 0;
  var amax = a.length;
  var bmin = 0;
  var bmax = b.length;

  var positions = this.match_alphabet_(a);

  var VP = ~0;
  var VN = 0;
  var diff = a.length;

  var VPs = [];
  var VNs = [];
  var y;
  var u;

  // [Hyy02] Fig. 3 -> Fig. 7
  for (var j = bmin; j <= bmax; j++) { 
      y = (b.charAt(j) in positions) ? positions[b.charAt(j)] : 0;
      X = y | VN;
      D0 = ((VP + (X & VP)) ^ VP) | X;
      HN = VP & D0;
      HP = VN | ~(VP|D0);
      X  = (HP << 1) | 1;
      VN = X & D0;
      VP = (HN << 1) | ~(X | D0);
      VPs[j] = VP;
      VNs[j] = VN;
  }
  return this.backtrace(VPs,VNs,amax,bmax);
}

lcs_bv.prototype.DAM = function(a,b) {

  var amin = 0;
  var amax = a.length;
  var bmin = 0;
  var bmax = b.length;

  var positions = this.match_alphabet_(a);

  var VP = ~0;
  var VN = 0;
  var TC = 0;
  var diff = a.length;

  var VPs = [];
  var VNs = [];
  var y;
  var u;

  // [Hyy02] Fig. 3 -> Fig. 7
  
  for (var j = bmin; j <= bmax; j++) { 
      y = (b.charAt(j) in positions) ? positions[b.charAt(j)] : 0;
      var z = 0;
      if (j > 0) {
        z = (b.charAt(j-1) in positions) 
            ? positions[b.charAt(j-1)] : 0;
      }
      TC = y | (((( ~TC) & y) << 1) & z);
      D0 = (((TC & VP) + VP) ^ VP) | TC | VN;
      HN = VP & D0;
      HP = VN | ~(VP|D0);
      X  = (HP << 1) | 1;
      VN = X & D0;
      VP = (HN << 1) | ~(X | D0);
      VPs[j] = VP;
      VNs[j] = VN;
  }
  return this.backtrace(VPs,VNs,amax,bmax);
}

// [Hyy04] Fig. 3
lcs_bv.prototype.backtrace = function(delta1,delta2,m,n) {
  var i = m-1;
  var j = n-1;
  
  var lcs = [];

  while (i >= 0 && j >= 0) {
    if (delta1[j] & (1<<i)) {
      lcs.unshift([i,-1]);
      i--;
    }
    else {
      if (delta2[j-1] & (1<<i)) {
        	lcs.unshift([-1,j]);
      }
      else {
        lcs.unshift([i,j]);
        i--;
      }
      j--;
    }
  }
  while (i >= 0) {
    lcs.unshift([i,-1]);
    i--;  
  }
  while (j >= 0) {
    lcs.unshift([-1,j]);
    j--;
  } 
  return lcs; 
}