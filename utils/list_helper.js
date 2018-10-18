const dummy = (blogs) => {
    return 1;
  }
const totalLikes = (blogs) => {
    const likes = blogs.map(liket => liket.likes);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return likes.reduce(reducer);
}
const favoriteBlog = (blogs) => {
    const likes = blogs.map(liket => liket.likes);
    const like = Math.max(...likes);
    return blogs.find(tykkays => tykkays.likes === like);
}
  module.exports = {dummy, totalLikes, favoriteBlog}


