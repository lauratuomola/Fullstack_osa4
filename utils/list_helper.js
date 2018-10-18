const dummy = (blogs) => {
    return 1;
  }


const totalLikes = (blogs) => {
    const likes = blogs.map(liket => liket.likes);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return likes.reduce(reducer);
}
  module.exports = {dummy, totalLikes}


