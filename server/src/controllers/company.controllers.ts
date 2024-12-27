import { Request, Response } from 'express'
import db from '../db'


class CompanyController {
  async addCompany(req: Request, res: Response): Promise<Response> {

    const { currentId,  owner, title, description, target, deadline, image } = req.body
    
    try {
      const company = await db.query(
        `INSERT INTO crowdfunding (
          currentId,
          owner,
          title,
          description,
          target,
          deadline,
          image
        ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [ currentId, owner, title, description, target, deadline, image]
      )
      return res.status(200).send({
        data: company.rows[0],
        success: true,
        message: 'The crowdfunding has been successfully created!'
      })
    } catch (err) {
      return res.status(403).send({
        message: 'Failed to create a crowdfunding!',
        error: err,
      })
    }
  }
  async getCompany (req: Request, res: Response): Promise<Response> {
    try {
      const company = await db.query(`SELECT * FROM crowdfunding`)
      return res.status(200).send({
        data: company.rows,
        success: true,
        message: 'The crowdfunding has been successfully get!'
      })
    } catch (err) {
      return res.status(403).send({
        message: 'Failed get crowdfunding',
        error: err
      })
    }
  }
  async getOneCompany (req: Request, res: Response): Promise<Response>  {
    try {
      const id = req.params.id
      const company = await db.query(`SELECT * FROM crowdfunding WHERE id = $1`, [id])
      return res.status(200).send({
        data: company.rows[0],
        success: true,
        message: 'The crowdfunding has been successfully get one!'
      })
    } catch (err) {
      return res.status(403).send({
        message: 'Failed get one crowdfunding',
        error: err
      })
    }
  }

  async updateCompany (req: Request, res: Response): Promise<Response>  {
    try {
      const { currentId, amount, amount_collected, donators, owner } = req.body

      const company = await db.query(
        `UPDATE crowdfunding 
         SET
          donators = ARRAY_APPEND(donators, $1::JSONB),
          amount_collected = $2
         WHERE currentId = $3
         RETURNING *`,
        [
          JSON.stringify({ donators, owner, amount }),
          amount_collected,
          currentId
        ]
      )

      return res.status(200).send({
        message: "Crowdfunding updated successfully",
        data: company.rows[0],
      })


    } catch (err) {
      return res.status(403).send({
        message: 'Failed update crowdfunding',
        error: err
      })
    }
  }

  
}



export default new CompanyController()