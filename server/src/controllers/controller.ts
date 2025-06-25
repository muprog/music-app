import { Request, Response } from 'express'

const test = (req: Request, res: Response) => {
  res.send('hello')
}

module.exports = {
  test,
}
