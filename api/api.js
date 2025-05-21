// index.js
import express from 'express'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use('/api/images', express.static('api/images'))

const products = [
  {
    id: 1,
    name: 'Red Apple',
    description: 'Fresh and crispy red apple from organic farms.',
    price: 0.5,
    image_url: '/api/images/red_apple.jpg',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Banana',
    description: 'Ripe bananas rich in potassium.',
    price: 0.3,
    image_url: '/api/images/banana.jpg',
    category: 'Fruits',
  },
  {
    id: 3,
    name: 'Whole Milk',
    description: "Whole cow's milk, high in calcium and vitamin D.",
    price: 1.2,
    image_url: '/api/images/whole_milk.jpg',
    category: 'Dairy',
  },
  {
    id: 4,
    name: 'Manchego Cheese',
    description: 'Aged Manchego cheese with a strong flavor.',
    price: 3.5,
    image_url: '/api/images/manchego_cheese.jpg',
    category: 'Dairy',
  },
  {
    id: 5,
    name: 'Tomato',
    description: 'Ripe tomatoes perfect for salads.',
    price: 0.8,
    image_url: '/api/images/tomato.jpg',
    category: 'Vegetables',
  },
]

const uniqueNames = [...new Set(products.map((p) => p.category))].sort()
const categories = uniqueNames.map((name, idx) => ({ id: idx + 1, name }))

// Routes
app.get('/api/categories', (req, res) => {
  res.json(categories)
})

app.get('/api/products', (req, res) => {
  const { category } = req.query
  if (category) {
    return res.json(products.filter((p) => p.category === category))
  }
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const product = products.find((p) => p.id === id)
  if (!product) {
    return res.status(404).json({ detail: 'Product not found' })
  }
  res.json(product)
})

const openapiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description:
      'API for a simple food e-commerce with products and categories.',
  },
  servers: [{ url: 'http://localhost:3000' }],
  paths: {
    '/api/categories': {
      get: {
        summary: 'List categories',
        responses: {
          200: {
            description: 'Array of category objects',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Category' },
                },
              },
            },
          },
        },
      },
    },
    '/api/products': {
      get: {
        summary: 'List products',
        parameters: [
          {
            name: 'category',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by category name',
          },
        ],
        responses: {
          200: {
            description: 'Array of product objects',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' },
                },
              },
            },
          },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        summary: 'Get a product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Product object',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          404: { description: 'Product not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
        required: ['id', 'name'],
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          image_url: { type: 'string' },
          category: { type: 'string' },
        },
        required: [
          'id',
          'name',
          'description',
          'price',
          'image_url',
          'category',
        ],
      },
    },
  },
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument))

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
)
