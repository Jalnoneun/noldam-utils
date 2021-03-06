const categoryTitle = {
  one: '1:1 돌봄',
  group: '그룹돌봄',
  with: '함께돌봄'
}

const programTitle = {
  normal: '일대일 돌봄',
  group: '여럿이서 돌봄',
  kidop: '키돕',
  booktalk: '북토크',
  tutor: '놀담학습도우미',
  daily_care: '일상돌봄',
  tri_cooking: '[삼총사] 쿠킹 클래스',
  tri_spring: '[삼총사] 우리아이 봄을찾기',
  tri_cooking2: '[삼총사] 피나포레 2탄',
  tri_mongcle: '[삼총사] 몽클',
  tri_simda: '[삼총사] 심다',
  tri_xmas: '[삼총사] 크리스마스',
  tri_newyear: '[삼총사] 소소한 새해맞이',
  town: '동네탐구생활',
  shhport: '쉿포츠',
  sk_2005: 'SK 함께돌봄',
  homecoming: '하원도우미',
  makingbox: '뚝딱 메이킹 박스',
  wadiz: '함께돌봄 와디즈',
  posco: '함께돌봄 포스코',
  apart_dreamgreen: '수원권선 꿈에그린',
  space_salim_2104: '스페이스 살림',
}

const programOptions = {
  tri_cooking: [
    {
      value: 0,
      text: '몬스터 컵케이크',
    },
    {
      value: 1,
      text: '머쉬멜로우 초콜릿 팝',
    },
    {
      value: 2,
      text: 'M&M 초콜릿 쿠키',
    },
    {
      value: 3,
      text: '알록달록 막대과자',
    },
    {
      value: 4,
      text: '망고코코넛 아이스팝',
    },
    {
      value: 5,
      text: '바크 초콜릿',
    },
    {
      value: 6,
      text: '구미베어 젤리',
    },
  ],
  tri_spring: [
    {
      value: 0,
      text: '테라리움',
    },
    {
      value: 1,
      text: '벚꽃 머랭쿠키',
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
  tri_cooking2: [
    {
      value: 0,
      text: '마쉬멜로우 초콜릿 팝',
    },
    {
      value: 1,
      text: '몬스터 컵 케이크',
    },
    {
      value: 2,
      text: 'M&M 초콜릿 쿠키',
    },
  ],
  tri_xmas: [
    {
      value: 0,
      text: '트리 마을',
    },
    {
      value: 1,
      text: '위시 오르골',
    },
  ],
  tri_newyear: [
    {
      value: 0,
      text: '옛놀이 상자',
    },
    {
      value: 1,
      text: '옛과자 강정',
    },
  ],
  makingbox: [
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
    define([], factory)
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