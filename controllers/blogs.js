const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (body.title === undefined && body.url === undefined) {
    return response.status(400).json({ error: 'title and url missing' })
  }
  if (body.likes === undefined) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0
    })
    const savedBlog = await blog.save()
    response.json(Blog.format(blog))
  } else {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    const savedBlog = await blog.save()
    response.json(Blog.format(blog))
  } 

})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(Blog.format(blog))


})
module.exports = blogsRouter