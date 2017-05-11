// @flow

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export {
  numberWithCommas, // eslint-disable-line
}
