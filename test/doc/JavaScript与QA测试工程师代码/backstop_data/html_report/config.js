report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/yd_qq_0_document_0_phone.png",
        "test": "../bitmaps_test/20180322-215108/yd_qq_0_document_0_phone.png",
        "selector": "document",
        "fileName": "yd_qq_0_document_0_phone.png",
        "label": "qq",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "3.18",
          "analysisTime": 45
        },
        "diffImage": "../bitmaps_test/20180322-215108/failed_diff_yd_qq_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/yd_qq_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180322-215108/yd_qq_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "yd_qq_0_document_1_tablet.png",
        "label": "qq",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "error": "Reference file not found /Users/yideng/Desktop/testdemo/backstop_data/bitmaps_reference/yd_qq_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "yd"
});