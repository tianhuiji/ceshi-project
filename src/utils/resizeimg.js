let ResizeImg, EXIF, MegaPixImage;

(function () {
  function e(e) {
    var t, n, r = e.naturalWidth, a = e.naturalHeight;
    return r * a > 1048576 ? (t = document.createElement("canvas"), t.width = t.height = 1, n = t.getContext("2d"), n.drawImage(e, -r + 1, 0), 0 === n.getImageData(0, 0, 1, 1).data[3]) : !1
  }

  function t(e, t, n) {
    var r, a, i, o, s, c, l, d = document.createElement("canvas");
    for (d.width = 1, d.height = n, r = d.getContext("2d"), r.drawImage(e, 0, 0), a = r.getImageData(0, 0, 1, n).data, i = 0, o = n, s = n; s > i;)c = a[4 * (s - 1) + 3], 0 === c ? o = s : i = s, s = o + i >> 1;
    return l = s / n, 0 === l ? 1 : l
  }

  function n(e, t, n) {
    var a = document.createElement("canvas");
    return r(e, a, t, n), a.toDataURL("image/jpeg", t.quality || .8)
  }

  function r(n, r, i, o) {
    var s, c, l, d, u, g, f, h, m, p, S, w = n.naturalWidth, P = n.naturalHeight, F = i.width, y = i.height, b = r.getContext("2d");
    for (b.save(), a(r, b, F, y, i.orientation), s = e(n), s && (w /= 2, P /= 2), c = 1024, l = document.createElement("canvas"), l.width = l.height = c, d = l.getContext("2d"), u = o ? t(n, w, P) : 1, g = Math.ceil(c * F / w), f = Math.ceil(c * y / P / u), h = 0, m = 0; P > h;) {
      for (p = 0, S = 0; w > p;)d.clearRect(0, 0, c, c), d.drawImage(n, -p, -h), b.drawImage(l, 0, 0, c, c, S, m, g, f), p += c, S += g;
      h += c, m += f
    }
    b.restore(), l = d = null
  }

  function a(e, t, n, r, a) {
    switch (a) {
      case 5:
      case 6:
      case 7:
      case 8:
        e.width = r, e.height = n;
        break;
      default:
        e.width = n, e.height = r
    }
    switch (a) {
      case 2:
        t.translate(n, 0), t.scale(-1, 1);
        break;
      case 3:
        t.translate(n, r), t.rotate(Math.PI);
        break;
      case 4:
        t.translate(0, r), t.scale(1, -1);
        break;
      case 5:
        t.rotate(.5 * Math.PI), t.scale(1, -1);
        break;
      case 6:
        t.rotate(.5 * Math.PI), t.translate(0, -r);
        break;
      case 7:
        t.rotate(.5 * Math.PI), t.translate(n, -r), t.scale(-1, 1);
        break;
      case 8:
        t.rotate(-.5 * Math.PI), t.translate(-n, 0)
    }
  }

  function i(e) {
    var t, n, r;
    if (window.Blob && e instanceof Blob) {
      if (t = new Image, n = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null, !n)throw Error("No createObjectURL function found to create blob url");
      t.src = n.createObjectURL(e), this.blob = e, e = t
    }
    e.naturalWidth || e.naturalHeight || (r = this, e.onload = function () {
      var e, t, n = r.imageLoadListeners;
      if (n)for (r.imageLoadListeners = null, e = 0, t = n.length; t > e; e++)n[e]()
    }, this.imageLoadListeners = []), this.srcImage = e
  }

  i.prototype.render = function (e, t, a) {
    var i, o, s, c, l, d, u, g, f, h, m;
    if (this.imageLoadListeners)return i = this, void this.imageLoadListeners.push(function () {
      i.render(e, t, a)
    });
    t = t || {}, o = this.srcImage.naturalWidth, s = this.srcImage.naturalHeight, c = t.width, l = t.height, d = t.maxWidth, u = t.maxHeight, g = !this.blob || "image/jpeg" === this.blob.type, c && !l ? l = s * c / o << 0 : l && !c ? c = o * l / s << 0 : (c = o, l = s), d && c > d && (c = d, l = s * c / o << 0), u && l > u && (l = u, c = o * l / s << 0), f = {
      width: c,
      height: l
    };
    for (h in t)f[h] = t[h];
    m = e.tagName.toLowerCase(), "img" === m ? e.src = n(this.srcImage, f, g) : "canvas" === m && r(this.srcImage, e, f, g), "function" == typeof this.onrender && this.onrender(e), a && a()
  };
  MegaPixImage = i;
}).call(window);

(function () {
  function e(e) {
    return !!e.exifdata
  }

  function t(e, t) {
    t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
    for (var n = atob(e), r = n.length, a = new ArrayBuffer(r), i = new Uint8Array(a), o = 0; r > o; o++)i[o] = n.charCodeAt(o);
    return a
  }

  function r(e, t) {
    var n = new XMLHttpRequest;
    n.open("GET", e, !0), n.responseType = "blob", n.onload = function () {
      (200 == this.status || 0 === this.status) && t(this.response)
    }, n.send()
  }

  function a(e, n) {
    function a(t) {
      var r = i(t), a = o(t);
      e.exifdata = r || {}, e.iptcdata = a || {}, n && n.call(e)
    }

    if (e.src)if (/^data\:/i.test(e.src)) {
      var s = t(e.src);
      a(s)
    } else if (/^blob\:/i.test(e.src)) {
      var c = new FileReader;
      c.onload = function (e) {
        a(e.target.result)
      }, r(e.src, function (e) {
        c.readAsArrayBuffer(e)
      })
    } else {
      var l = new XMLHttpRequest;
      l.onload = function () {
        if (200 != this.status && 0 !== this.status)throw"Could not load image";
        a(l.response), l = null
      }, l.open("GET", e.src, !0), l.responseType = "arraybuffer", l.send(null)
    } else if (window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
      var c = new FileReader;
      c.onload = function (e) {
        g && console.log("Got file of length " + e.target.result.byteLength), a(e.target.result)
      }, c.readAsArrayBuffer(e)
    }
  }

  function i(e) {
    var t = new DataView(e);
    if (g && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1))return g && console.log("Not a valid JPEG"), !1;
    for (var n, r = 2, a = e.byteLength; a > r;) {
      if (255 != t.getUint8(r))return g && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)), !1;
      if (n = t.getUint8(r + 1), g && console.log(n), 225 == n)return g && console.log("Found 0xFFE1 marker"), u(t, r + 4, t.getUint16(r + 2) - 2);
      r += 2 + t.getUint16(r + 2)
    }
  }

  function o(e) {
    var t = new DataView(e);
    if (g && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1))return g && console.log("Not a valid JPEG"), !1;
    for (var n = 2, r = e.byteLength, a = function (e, t) {
      return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
    }; r > n;) {
      if (a(t, n)) {
        var i = t.getUint8(n + 7);
        i % 2 !== 0 && (i += 1), 0 === i && (i = 4);
        var o = n + 8 + i, c = t.getUint16(n + 6 + i);
        return s(e, o, c)
      }
      n++
    }
  }

  function s(e, t, n) {
    for (var r, a, i, o, s, c = new DataView(e), l = {}, u = t; t + n > u;)28 === c.getUint8(u) && 2 === c.getUint8(u + 1) && (o = c.getUint8(u + 2), o in P && (i = c.getInt16(u + 3), s = i + 5, a = P[o], r = d(c, u + 5, i), l.hasOwnProperty(a) ? l[a] instanceof Array ? l[a].push(r) : l[a] = [l[a], r] : l[a] = r)), u++;
    return l
  }

  function c(e, t, n, r, a) {
    var i, o, s, c = e.getUint16(n, !a), d = {};
    for (s = 0; c > s; s++)i = n + 12 * s + 2, o = r[e.getUint16(i, !a)], !o && g && console.log("Unknown tag: " + e.getUint16(i, !a)), d[o] = l(e, i, t, n, a);
    return d
  }

  function l(e, t, n, r, a) {
    var i, o, s, c, l, u, g = e.getUint16(t + 2, !a), f = e.getUint32(t + 4, !a), h = e.getUint32(t + 8, !a) + n;
    switch (g) {
      case 1:
      case 7:
        if (1 == f)return e.getUint8(t + 8, !a);
        for (i = f > 4 ? h : t + 8, o = [], c = 0; f > c; c++)o[c] = e.getUint8(i + c);
        return o;
      case 2:
        return i = f > 4 ? h : t + 8, d(e, i, f - 1);
      case 3:
        if (1 == f)return e.getUint16(t + 8, !a);
        for (i = f > 2 ? h : t + 8, o = [], c = 0; f > c; c++)o[c] = e.getUint16(i + 2 * c, !a);
        return o;
      case 4:
        if (1 == f)return e.getUint32(t + 8, !a);
        for (o = [], c = 0; f > c; c++)o[c] = e.getUint32(h + 4 * c, !a);
        return o;
      case 5:
        if (1 == f)return l = e.getUint32(h, !a), u = e.getUint32(h + 4, !a), s = new Number(l / u), s.numerator = l, s.denominator = u, s;
        for (o = [], c = 0; f > c; c++)l = e.getUint32(h + 8 * c, !a), u = e.getUint32(h + 4 + 8 * c, !a), o[c] = new Number(l / u), o[c].numerator = l, o[c].denominator = u;
        return o;
      case 9:
        if (1 == f)return e.getInt32(t + 8, !a);
        for (o = [], c = 0; f > c; c++)o[c] = e.getInt32(h + 4 * c, !a);
        return o;
      case 10:
        if (1 == f)return e.getInt32(h, !a) / e.getInt32(h + 4, !a);
        for (o = [], c = 0; f > c; c++)o[c] = e.getInt32(h + 8 * c, !a) / e.getInt32(h + 4 + 8 * c, !a);
        return o
    }
  }

  function d(e, t, r) {
    var a = "";
    for (n = t; n < t + r; n++)a += String.fromCharCode(e.getUint8(n));
    return a
  }

  function u(e, t) {
    if ("Exif" != d(e, t, 4))return g && console.log("Not valid EXIF data! " + d(e, t, 4)), !1;
    var n, r, a, i, o, s = t + 6;
    if (18761 == e.getUint16(s))n = !1; else {
      if (19789 != e.getUint16(s))return g && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
      n = !0
    }
    if (42 != e.getUint16(s + 2, !n))return g && console.log("Not valid TIFF data! (no 0x002A)"), !1;
    var l = e.getUint32(s + 4, !n);
    if (8 > l)return g && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !n)), !1;
    if (r = c(e, s, s + l, p, n), r.ExifIFDPointer) {
      i = c(e, s, s + r.ExifIFDPointer, m, n);
      for (a in i) {
        switch (a) {
          case"LightSource":
          case"Flash":
          case"MeteringMode":
          case"ExposureProgram":
          case"SensingMethod":
          case"SceneCaptureType":
          case"SceneType":
          case"CustomRendered":
          case"WhiteBalance":
          case"GainControl":
          case"Contrast":
          case"Saturation":
          case"Sharpness":
          case"SubjectDistanceRange":
          case"FileSource":
            i[a] = w[a][i[a]];
            break;
          case"ExifVersion":
          case"FlashpixVersion":
            i[a] = String.fromCharCode(i[a][0], i[a][1], i[a][2], i[a][3]);
            break;
          case"ComponentsConfiguration":
            i[a] = w.Components[i[a][0]] + w.Components[i[a][1]] + w.Components[i[a][2]] + w.Components[i[a][3]]
        }
        r[a] = i[a]
      }
    }
    if (r.GPSInfoIFDPointer) {
      o = c(e, s, s + r.GPSInfoIFDPointer, S, n);
      for (a in o) {
        switch (a) {
          case"GPSVersionID":
            o[a] = o[a][0] + "." + o[a][1] + "." + o[a][2] + "." + o[a][3]
        }
        r[a] = o[a]
      }
    }
    return r
  }

  var g = !1, f = this, h = function (e) {
    return e instanceof h ? e : this instanceof h ? void(this.EXIFwrapped = e) : new h(e)
  };
  EXIF = h;
  var m = h.Tags = {
    36864: "ExifVersion",
    40960: "FlashpixVersion",
    40961: "ColorSpace",
    40962: "PixelXDimension",
    40963: "PixelYDimension",
    37121: "ComponentsConfiguration",
    37122: "CompressedBitsPerPixel",
    37500: "MakerNote",
    37510: "UserComment",
    40964: "RelatedSoundFile",
    36867: "DateTimeOriginal",
    36868: "DateTimeDigitized",
    37520: "SubsecTime",
    37521: "SubsecTimeOriginal",
    37522: "SubsecTimeDigitized",
    33434: "ExposureTime",
    33437: "FNumber",
    34850: "ExposureProgram",
    34852: "SpectralSensitivity",
    34855: "ISOSpeedRatings",
    34856: "OECF",
    37377: "ShutterSpeedValue",
    37378: "ApertureValue",
    37379: "BrightnessValue",
    37380: "ExposureBias",
    37381: "MaxApertureValue",
    37382: "SubjectDistance",
    37383: "MeteringMode",
    37384: "LightSource",
    37385: "Flash",
    37396: "SubjectArea",
    37386: "FocalLength",
    41483: "FlashEnergy",
    41484: "SpatialFrequencyResponse",
    41486: "FocalPlaneXResolution",
    41487: "FocalPlaneYResolution",
    41488: "FocalPlaneResolutionUnit",
    41492: "SubjectLocation",
    41493: "ExposureIndex",
    41495: "SensingMethod",
    41728: "FileSource",
    41729: "SceneType",
    41730: "CFAPattern",
    41985: "CustomRendered",
    41986: "ExposureMode",
    41987: "WhiteBalance",
    41988: "DigitalZoomRation",
    41989: "FocalLengthIn35mmFilm",
    41990: "SceneCaptureType",
    41991: "GainControl",
    41992: "Contrast",
    41993: "Saturation",
    41994: "Sharpness",
    41995: "DeviceSettingDescription",
    41996: "SubjectDistanceRange",
    40965: "InteroperabilityIFDPointer",
    42016: "ImageUniqueID"
  }, p = h.TiffTags = {
    256: "ImageWidth",
    257: "ImageHeight",
    34665: "ExifIFDPointer",
    34853: "GPSInfoIFDPointer",
    40965: "InteroperabilityIFDPointer",
    258: "BitsPerSample",
    259: "Compression",
    262: "PhotometricInterpretation",
    274: "Orientation",
    277: "SamplesPerPixel",
    284: "PlanarConfiguration",
    530: "YCbCrSubSampling",
    531: "YCbCrPositioning",
    282: "XResolution",
    283: "YResolution",
    296: "ResolutionUnit",
    273: "StripOffsets",
    278: "RowsPerStrip",
    279: "StripByteCounts",
    513: "JPEGInterchangeFormat",
    514: "JPEGInterchangeFormatLength",
    301: "TransferFunction",
    318: "WhitePoint",
    319: "PrimaryChromaticities",
    529: "YCbCrCoefficients",
    532: "ReferenceBlackWhite",
    306: "DateTime",
    270: "ImageDescription",
    271: "Make",
    272: "Model",
    305: "Software",
    315: "Artist",
    33432: "Copyright"
  }, S = h.GPSTags = {
    0: "GPSVersionID",
    1: "GPSLatitudeRef",
    2: "GPSLatitude",
    3: "GPSLongitudeRef",
    4: "GPSLongitude",
    5: "GPSAltitudeRef",
    6: "GPSAltitude",
    7: "GPSTimeStamp",
    8: "GPSSatellites",
    9: "GPSStatus",
    10: "GPSMeasureMode",
    11: "GPSDOP",
    12: "GPSSpeedRef",
    13: "GPSSpeed",
    14: "GPSTrackRef",
    15: "GPSTrack",
    16: "GPSImgDirectionRef",
    17: "GPSImgDirection",
    18: "GPSMapDatum",
    19: "GPSDestLatitudeRef",
    20: "GPSDestLatitude",
    21: "GPSDestLongitudeRef",
    22: "GPSDestLongitude",
    23: "GPSDestBearingRef",
    24: "GPSDestBearing",
    25: "GPSDestDistanceRef",
    26: "GPSDestDistance",
    27: "GPSProcessingMethod",
    28: "GPSAreaInformation",
    29: "GPSDateStamp",
    30: "GPSDifferential"
  }, w = h.StringValues = {
    ExposureProgram: {
      0: "Not defined",
      1: "Manual",
      2: "Normal program",
      3: "Aperture priority",
      4: "Shutter priority",
      5: "Creative program",
      6: "Action program",
      7: "Portrait mode",
      8: "Landscape mode"
    },
    MeteringMode: {
      0: "Unknown",
      1: "Average",
      2: "CenterWeightedAverage",
      3: "Spot",
      4: "MultiSpot",
      5: "Pattern",
      6: "Partial",
      255: "Other"
    },
    LightSource: {
      0: "Unknown",
      1: "Daylight",
      2: "Fluorescent",
      3: "Tungsten (incandescent light)",
      4: "Flash",
      9: "Fine weather",
      10: "Cloudy weather",
      11: "Shade",
      12: "Daylight fluorescent (D 5700 - 7100K)",
      13: "Day white fluorescent (N 4600 - 5400K)",
      14: "Cool white fluorescent (W 3900 - 4500K)",
      15: "White fluorescent (WW 3200 - 3700K)",
      17: "Standard light A",
      18: "Standard light B",
      19: "Standard light C",
      20: "D55",
      21: "D65",
      22: "D75",
      23: "D50",
      24: "ISO studio tungsten",
      255: "Other"
    },
    Flash: {
      0: "Flash did not fire",
      1: "Flash fired",
      5: "Strobe return light not detected",
      7: "Strobe return light detected",
      9: "Flash fired, compulsory flash mode",
      13: "Flash fired, compulsory flash mode, return light not detected",
      15: "Flash fired, compulsory flash mode, return light detected",
      16: "Flash did not fire, compulsory flash mode",
      24: "Flash did not fire, auto mode",
      25: "Flash fired, auto mode",
      29: "Flash fired, auto mode, return light not detected",
      31: "Flash fired, auto mode, return light detected",
      32: "No flash function",
      65: "Flash fired, red-eye reduction mode",
      69: "Flash fired, red-eye reduction mode, return light not detected",
      71: "Flash fired, red-eye reduction mode, return light detected",
      73: "Flash fired, compulsory flash mode, red-eye reduction mode",
      77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
      79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
      89: "Flash fired, auto mode, red-eye reduction mode",
      93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
      95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
    },
    SensingMethod: {
      1: "Not defined",
      2: "One-chip color area sensor",
      3: "Two-chip color area sensor",
      4: "Three-chip color area sensor",
      5: "Color sequential area sensor",
      7: "Trilinear sensor",
      8: "Color sequential linear sensor"
    },
    SceneCaptureType: {0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene"},
    SceneType: {1: "Directly photographed"},
    CustomRendered: {0: "Normal process", 1: "Custom process"},
    WhiteBalance: {0: "Auto white balance", 1: "Manual white balance"},
    GainControl: {0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down"},
    Contrast: {0: "Normal", 1: "Soft", 2: "Hard"},
    Saturation: {0: "Normal", 1: "Low saturation", 2: "High saturation"},
    Sharpness: {0: "Normal", 1: "Soft", 2: "Hard"},
    SubjectDistanceRange: {0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view"},
    FileSource: {3: "DSC"},
    Components: {0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B"}
  }, P = {
    120: "caption",
    110: "credit",
    25: "keywords",
    55: "dateCreated",
    80: "byline",
    85: "bylineTitle",
    122: "captionWriter",
    105: "headline",
    116: "copyright",
    15: "category"
  };
  h.getData = function (t, n) {
    return (t instanceof Image || t instanceof HTMLImageElement) && !t.complete ? !1 : (e(t) ? n && n.call(t) : a(t, n), !0)
  }, h.getTag = function (t, n) {
    return e(t) ? t.exifdata[n] : void 0
  }, h.getAllTags = function (t) {
    if (!e(t))return {};
    var n, r = t.exifdata, a = {};
    for (n in r)r.hasOwnProperty(n) && (a[n] = r[n]);
    return a
  }, h.pretty = function (t) {
    if (!e(t))return "";
    var n, r = t.exifdata, a = "";
    for (n in r)r.hasOwnProperty(n) && (a += "object" == typeof r[n] ? r[n] instanceof Number ? n + " : " + r[n] + " [" + r[n].numerator + "/" + r[n].denominator + "]\r\n" : n + " : [" + r[n].length + " values]\r\n" : n + " : " + r[n] + "\r\n");
    return a
  }, h.readFromBinaryFile = function (e) {
    return i(e)
  }, "function" == typeof define && define.amd && define("exif-js", [], function () {
    return h
  })
}).call(window);

function JPEGEncoder(r) {
  function a(r) {
    for (var a = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], n = 0; 64 > n; n++) {
      var o = C((a[n] * r + 50) / 100);
      1 > o ? o = 1 : o > 255 && (o = 255), M[B[n]] = o
    }
    for (var e = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], f = 0; 64 > f; f++) {
      var t = C((e[f] * r + 50) / 100);
      1 > t ? t = 1 : t > 255 && (t = 255), b[B[f]] = t
    }
    for (var v = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], i = 0, c = 0; 8 > c; c++)for (var u = 0; 8 > u; u++)j[i] = 1 / (M[B[i]] * v[c] * v[u] * 8), _[i] = 1 / (b[B[i]] * v[c] * v[u] * 8), i++
  }

  function n(r, a) {
    for (var n = 0, o = 0, e = new Array, f = 1; 16 >= f; f++) {
      for (var t = 1; t <= r[f]; t++)e[a[o]] = [], e[a[o]][0] = n, e[a[o]][1] = f, o++, n++;
      n *= 2
    }
    return e
  }

  function o() {
    m = n(F, H), D = n(O, R), T = n(K, L), E = n(V, W)
  }

  function e() {
    for (var r = 1, a = 2, n = 1; 15 >= n; n++) {
      for (var o = r; a > o; o++)G[32767 + o] = n, z[32767 + o] = [], z[32767 + o][1] = n, z[32767 + o][0] = o;
      for (var e = -(a - 1); -r >= e; e++)G[32767 + e] = n, z[32767 + e] = [], z[32767 + e][1] = n, z[32767 + e][0] = a - 1 + e;
      r <<= 1, a <<= 1
    }
  }

  function f() {
    for (var r = 0; 256 > r; r++)x[r] = 19595 * r, x[r + 256 >> 0] = 38470 * r, x[r + 512 >> 0] = 7471 * r + 32768, x[r + 768 >> 0] = -11059 * r, x[r + 1024 >> 0] = -21709 * r, x[r + 1280 >> 0] = 32768 * r + 8421375, x[r + 1536 >> 0] = -27439 * r, x[r + 1792 >> 0] = -5329 * r
  }

  function t(r) {
    for (var a = r[0], n = r[1] - 1; n >= 0;)a & 1 << n && (P |= 1 << Q), n--, Q--, 0 > Q && (255 == P ? (v(255), v(0)) : v(P), Q = 7, P = 0)
  }

  function v(r) {
    N.push(q[r])
  }

  function i(r) {
    v(r >> 8 & 255), v(255 & r)
  }

  function c(r, a) {
    var n, o, e, f, t, v, i, c, u, w = 0;
    const y = 8, g = 64;
    for (u = 0; y > u; ++u) {
      n = r[w], o = r[w + 1], e = r[w + 2], f = r[w + 3], t = r[w + 4], v = r[w + 5], i = r[w + 6], c = r[w + 7];
      var A = n + c, h = n - c, s = o + i, d = o - i, l = e + v, m = e - v, D = f + t, T = f - t, E = A + D, p = A - D, C = s + l, M = s - l;
      r[w] = E + C, r[w + 4] = E - C;
      var b = .707106781 * (M + p);
      r[w + 2] = p + b, r[w + 6] = p - b, E = T + m, C = m + d, M = d + h;
      var j = .382683433 * (E - M), _ = .5411961 * E + j, z = 1.306562965 * M + j, G = .707106781 * C, J = h + G, N = h - G;
      r[w + 5] = N + _, r[w + 3] = N - _, r[w + 1] = J + z, r[w + 7] = J - z, w += 8
    }
    for (w = 0, u = 0; y > u; ++u) {
      n = r[w], o = r[w + 8], e = r[w + 16], f = r[w + 24], t = r[w + 32], v = r[w + 40], i = r[w + 48], c = r[w + 56];
      var P = n + c, Q = n - c, S = o + i, U = o - i, k = e + v, q = e - v, x = f + t, B = f - t, F = P + x, H = P - x, K = S + k, L = S - k;
      r[w] = F + K, r[w + 32] = F - K;
      var O = .707106781 * (L + H);
      r[w + 16] = H + O, r[w + 48] = H - O, F = B + q, K = q + U, L = U + Q;
      var R = .382683433 * (F - L), V = .5411961 * F + R, W = 1.306562965 * L + R, X = .707106781 * K, Y = Q + X, Z = Q - X;
      r[w + 40] = Z + V, r[w + 24] = Z - V, r[w + 8] = Y + W, r[w + 56] = Y - W, w++
    }
    var $;
    for (u = 0; g > u; ++u)$ = r[u] * a[u], I[u] = $ > 0 ? $ + .5 | 0 : $ - .5 | 0;
    return I
  }

  function u() {
    i(65504), i(16), v(74), v(70), v(73), v(70), v(0), v(1), v(1), v(0), i(1), i(1), v(0), v(0)
  }

  function w(r, a) {
    i(65472), i(17), v(8), i(a), i(r), v(3), v(1), v(17), v(0), v(2), v(17), v(1), v(3), v(17), v(1)
  }

  function y() {
    i(65499), i(132), v(0);
    for (var r = 0; 64 > r; r++)v(M[r]);
    v(1);
    for (var a = 0; 64 > a; a++)v(b[a])
  }

  function g() {
    i(65476), i(418), v(0);
    for (var r = 0; 16 > r; r++)v(F[r + 1]);
    for (var a = 0; 11 >= a; a++)v(H[a]);
    v(16);
    for (var n = 0; 16 > n; n++)v(K[n + 1]);
    for (var o = 0; 161 >= o; o++)v(L[o]);
    v(1);
    for (var e = 0; 16 > e; e++)v(O[e + 1]);
    for (var f = 0; 11 >= f; f++)v(R[f]);
    v(17);
    for (var t = 0; 16 > t; t++)v(V[t + 1]);
    for (var c = 0; 161 >= c; c++)v(W[c])
  }

  function A() {
    i(65498), i(12), v(3), v(1), v(0), v(2), v(17), v(3), v(17), v(0), v(63), v(0)
  }

  function h(r, a, n, o, e) {
    var f, v = e[0], i = e[240];
    const u = 16, w = 63, y = 64;
    for (var g = c(r, a), A = 0; y > A; ++A)J[B[A]] = g[A];
    var h = J[0] - n;
    n = J[0], 0 == h ? t(o[0]) : (f = 32767 + h, t(o[G[f]]), t(z[f]));
    for (var s = 63; s > 0 && 0 == J[s]; s--);
    if (0 == s)return t(v), n;
    for (var d, l = 1; s >= l;) {
      for (var m = l; 0 == J[l] && s >= l; ++l);
      var D = l - m;
      if (D >= u) {
        d = D >> 4;
        for (var T = 1; d >= T; ++T)t(i);
        D = 15 & D
      }
      f = 32767 + J[l], t(e[(D << 4) + G[f]]), t(z[f]), l++
    }
    return s != w && t(v), n
  }

  function s() {
    for (var r = String.fromCharCode, a = 0; 256 > a; a++)q[a] = r(a)
  }

  function d(r) {
    if (0 >= r && (r = 1), r > 100 && (r = 100), p != r) {
      var n = 0;
      n = Math.floor(50 > r ? 5e3 / r : 200 - 2 * r), a(n), p = r, console.log("Quality set to: " + r + "%")
    }
  }

  function l() {
    var a = (new Date).getTime();
    r || (r = 50), s(), o(), e(), f(), d(r);
    var n = (new Date).getTime() - a;
    console.log("Initialization " + n + "ms")
  }

  var m, D, T, E, p, C = (Math.round, Math.floor), M = new Array(64), b = new Array(64), j = new Array(64), _ = new Array(64), z = new Array(65535), G = new Array(65535), I = new Array(64), J = new Array(64), N = [], P = 0, Q = 7, S = new Array(64), U = new Array(64), k = new Array(64), q = new Array(256), x = new Array(2048), B = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], F = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], H = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], K = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], L = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], O = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], R = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], V = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], W = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  this.encode = function (r, a, n) {
    var o = (new Date).getTime();
    a && d(a), N = new Array, P = 0, Q = 7, i(65496), u(), y(), w(r.width, r.height), g(), A();
    var e = 0, f = 0, v = 0;
    P = 0, Q = 7, this.encode.displayName = "_encode_";
    for (var c, s, l, p, C, M, b, z, G, I = r.data, J = r.width, q = r.height, B = 4 * J, F = 0; q > F;) {
      for (c = 0; B > c;) {
        for (C = B * F + c, M = C, b = -1, z = 0, G = 0; 64 > G; G++)z = G >> 3, b = 4 * (7 & G), M = C + z * B + b, F + z >= q && (M -= B * (F + 1 + z - q)), c + b >= B && (M -= c + b - B + 4), s = I[M++], l = I[M++], p = I[M++], S[G] = (x[s] + x[l + 256 >> 0] + x[p + 512 >> 0] >> 16) - 128, U[G] = (x[s + 768 >> 0] + x[l + 1024 >> 0] + x[p + 1280 >> 0] >> 16) - 128, k[G] = (x[s + 1280 >> 0] + x[l + 1536 >> 0] + x[p + 1792 >> 0] >> 16) - 128;
        e = h(S, j, e, m, T), f = h(U, _, f, D, E), v = h(k, _, v, D, E), c += 32
      }
      F += 8
    }
    if (Q >= 0) {
      var H = [];
      H[1] = Q + 1, H[0] = (1 << Q + 1) - 1, t(H)
    }
    if (i(65497), n) {
      for (var K = N.length, L = new Uint8Array(K), O = 0; K > O; O++)L[O] = N[O].charCodeAt();
      N = [];
      var R = (new Date).getTime() - o;
      return console.log("Encoding time: " + R + "ms"), L
    }
    var V = "data:image/jpeg;base64," + btoa(N.join(""));
    N = [];
    var R = (new Date).getTime() - o;
    return console.log("Encoding time: " + R + "ms"), V
  }, l()
}

!function () {
  function t(t, e, i) {
    if (this.file = t, this.callback = i, this.defaults = {quality: 7}, i) {
      for (var a in e)this.defaults[a] = e[a];
      this.defaults.quality > 10 && (this.defaults.quality = 10)
    } else this.callback = e;
    this.results = {blob: null, origin: null, base64: null}, this.init()
  }

  window.URL = window.URL || window.webkitURL;
  var e = navigator.userAgent;
  t.prototype = {
    constructor: t, init: function () {
      var t = this;
      t.create(t.file, t.callback)
    }, create: function (t, i) {
      var a = this, n = new Image, h = a.results, l = URL.createObjectURL(t);
      n.onload = function () {
        var r, s = a.resize(this), o = document.createElement("canvas");
        o.width = s.w, o.height = s.h, r = o.getContext("2d");
        var c = new MegaPixImage(n);
        EXIF.getData(n, function () {
          if (c.render(o, {
              width: o.width,
              height: o.height,
              orientation: EXIF.getTag(this, "Orientation")
            }), r.fillStyle = "#fff", r.fillRect(0, 0, o.width, o.height), h.blob = l, h.origin = t, r.drawImage(n, 0, 0, s.w, s.h), /Android/i.test(e))try {
            var u = new JPEGEncoder;
            h.base64 = u.encode(r.getImageData(0, 0, o.width, o.height), 100 * a.defaults.quality)
          } catch (d) {
            alert("未引用mobile补丁，无法生成图片。")
          } else h.base64 = o.toDataURL("image/jpeg", a.defaults.quality);
          i(h)
        })
      }, n.src = l
    }, resize: function (t) {
      var e = this.defaults.width, i = this.defaults.height, a = t.width / t.height, n = {w: t.width, h: t.height};
      return e & i ? (n.w = e, n.h = i) : e ? (n.w = e, n.h = Math.ceil(e / a)) : i && (n.w = Math.ceil(i * a), n.h = i), n
    }
  };
  ResizeImg = function (e, i, a) {
    return new t(e, i, a)
  }
}();

export default ResizeImg;