/// <reference types="cypress" />
import React from 'react'
import Button from './Button.jsx'
import { mount } from 'cypress-react-unit-test'

describe('Button component', () => {
  it('works', () => {
    mount(<Button />)
    cy.get('button')
  })
})
