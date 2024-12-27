import { Router } from 'express'
import CompanyController from '../controllers/company.controllers'

const companyRouter: Router = Router()

companyRouter.post('/company',  CompanyController.addCompany as any)
companyRouter.get('/company',  CompanyController.getCompany as any)
companyRouter.get('/company/:id',  CompanyController.getOneCompany as any)
companyRouter.put('/company',  CompanyController.updateCompany as any)

export {
  companyRouter
}