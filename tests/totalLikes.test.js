const listHelper = require('../utils/list_helper')

describe.skip( () => {
    ('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
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
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('when list has more than one blog equals like of that', () => {
       const result = listHelper.totalLikes(blogList)
       expect(result).toBe(15)
    })

  })
})