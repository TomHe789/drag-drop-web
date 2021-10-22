var Mock = require("mockjs");
var express = require("express");
var router = express.Router();

// box mock数据 包括标题内容以及背景颜色
router.use("/boxData", function (req, res) {
  var data = Mock.mock({
    "list|3": [
      {
        "id|+1": 1,
        "type|+1": 1,
        "titleContent|+1": ["Prepare to study", "Learning", "Complete"],
        "backgroundColor|+1": [
          "rgb(238,220,220)",
          "rgb(156,210,142)",
          "rgb(221,221,221)",
        ],
      },
    ],
  });

  return res.json(data);
});

// router.use('/containerColor', function (req, res) {
//     var data = Mock.mock({
//         'list|3': [{
//             'id|+1': 1,
//             'color|+1': [
//                 'rgb(238,220,220)',
//                 'rgb(156,210,142)',
//                 'rgb(221,221,221)'
//             ]
//         }]
//     })

//     return res.json(data)
// })

module.exports = router;
