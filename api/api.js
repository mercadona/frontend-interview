import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use('/api/images', express.static('api/images'))

const products = [
  {
    id: 1,
    name: 'Red Apple',
    description: 'Fresh and crispy red apple from organic farms.',
    price: 0.5,
    image_url: '/api/images/red_apple.png',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Banana',
    description: 'Ripe bananas rich in potassium.',
    price: 0.3,
    image_url: '/api/images/banana.png',
    category: 'Fruits',
  },
  {
    id: 3,
    name: 'Whole Milk',
    description: "Whole cow's milk, high in calcium and vitamin D.",
    price: 1.2,
    image_url: '/api/images/whole_milk.png',
    category: 'Dairy',
  },
  {
    id: 4,
    name: 'Manchego Cheese',
    description: 'Aged Manchego cheese with a strong flavor.',
    price: 3.5,
    image_url: '/api/images/manchego_cheese.png',
    category: 'Dairy',
  },
  {
    id: 5,
    name: 'Tomato',
    description: 'Ripe tomatoes perfect for salads.',
    price: 0.8,
    image_url: '/api/images/tomato.png',
    category: 'Vegetables',
  },
]

// Routes
app.get('/api/products', (req, res) => {
  const { category } = req.query
  if (category) {
    return res.json(products.filter((p) => p.category === category))
  }
  res.json(products)
})

const openapiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description:
      'API for a simple food e-commerce with products and categories.',
  },
  servers: [{ url: 'http://localhost:8000' }],
  paths: {
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
  },
  components: {
    schemas: {
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
