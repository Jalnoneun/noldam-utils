const categoryTitle = {
  one: '1:1 돌봄',
  group: '그룹돌봄',
  with: '함께돌봄'
}

const programTitle = {
  kidop: '키돕',
  booktalk: '북토크',
  tutor: '놀담학습도우미',
  tri_cooking: '삼총사 - 피나포레',
  tri_cooking2: '삼총사 - 피나포레 2탄',
  tri_mongcle: '삼총사 - 몽클',
  tri_simda: '삼총사 - 심다',
  town: '동네탐구생활',
  shhport: '쉿포츠',
  sk_2005: 'SK 함께돌봄',
  homecoming: '하원도우미',
  makingBox: '뚝딱 메이킹 박스',
}

const programOptions = {
  tri_cooking: [
    {
      value: 0,
      text: 'A타입',
      option2: [
        {
          value: 0,
          text: '망고코코넛 아이스팝'
        },
        {
          value: 1,
          text: '알록달록 막대과자'
        },
      ]
    },
    {
      value: 1,
      text: 'B타입',
      option2: [
        {
          value: 0,
          text: '구미베어 젤리'
        },
        {
          value: 1,
          text: '바크 초콜릿'
        },
      ]
    },
  ],
  tri_mongcle: [
    {
      value: 0,
      text: '도우 페인팅',
    },
    {
      value: 1,
      text: '마이 컬러',
    },
    {
      value: 2,
      text: '네이처 클레이',
    },
  ],
  makingBox: [
    {
      value: 0,
      text: '탐험가 박스',
    },
    {
      value: 1,
      text: '여행가 박스',
    },
    {
      value: 2,
      text: '우주인 박스',
    },
  ],
}

const program = {
  categoryTitle,
  programTitle,
  programOptions,
}

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['program'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(program)
  } else {
    // browser
    root.isDev = factory()
  }
})(this, function() {
  return program
})