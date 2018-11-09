const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, blogsInDb } = require('./test_helper')


describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
  })


  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(n => n.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })

  })
})
  describe('addition of a new blog', async () => {
    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb()
      const newBlog = {
        title: "Wikipedia",
        author: "Someone",
        url: "www.wikipedia.com",
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
      const titles = blogsAfterOperation.map(r => r.title)
      expect(titles).toContain('Wikipedia')
    })

    test('POST /api/blogs likes=0 if likes are missing', async () => {
      const blogsAtStart = await blogsInDb()
      const newBlog = {
        title: "Ruokablogi",
        author: "Kokki",
        url: "blogspot.ruokablogi.com"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
      const likes = blogsAfterOperation.map(r => r.likes)
      expect(likes).toContain(0)




    })
    test('POST /api/blogs fails if title and url are missing', async () => {
      const newBlog = {
        author: "someone",
        likes: 120
      }
      const blogsAtStart = await blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      const blogsAfterOperation = await blogsInDb()
      const titles = blogsAfterOperation.map(r => r.title)

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
  })


  afterAll(() => {
    server.close()
  })