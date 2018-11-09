const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

    const blogList = [
        {
            _id: '10',
            title: 'blogi1',
            author: 'joku1',
            url: 'www.fi',
            likes: 3,
            _v: 0
        },
        {
            _id: '11',
            title: 'blogi2',
            author: 'joku2',
            url: 'www.com',
            likes: 7,
            _v: 0
        },
        {
            _id: '2',
            title: 'blogi3',
            author: 'joku3',
            url: 'www.com/jes',
            likes: 5,
            _v: 0
        }

    ]

    test('blog with most likes', () => {
       const result = listHelper.favoriteBlog(blogList);
       const lke = Math.max(...blogList.map (liket => liket.likes));


       const blog = blogList.find (tykkays => tykkays.likes === lke);

        console.log(blog)
       expect(result).toEqual(blog)
       
    })

  })