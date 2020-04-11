import s from './selectors'

describe('Battle Sim — Reset', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should reset all info', () => {
    cy.get(s.RED_HEALTH_INPUT)
      // Cypress struggles calling `.clear()` on a `number` input
      // See: https://github.com/cypress-io/cypress/issues/2650
      .focus()
      .type('{selectall}9')
      .get(s.BLUE_FACTION_SELECT)
      .select('ironclad')
      .get(s.GRID_MARKERS_CHECKBOX)
      .click()
      .fill('A1', { card: 'Zhev' })
      .fill('E1', { card: 'Sound', level: 3, strength: 10, player: 'RED' })
      .draw({ slot: 1, card: 'Toxic' })
      .draw({ slot: 2, card: 'Crimson' })
      .draw({ slot: 3, card: 'Copper' })

      .get(s.RESET_BOARD_BTN)
      .click()
      .get(s.RESET_BOARD_CONFIRM_BTN)
      .click()
      .get(s.RED_HEALTH)
      .should('have.text', '10')
      .get(s.BLUE_FACTION)
      .should('have.text', 'neutral')
      .get(s.GRID_MARKERS)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
      .get(s.CELL_E1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_E1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
      .get(s.CARD_SLOT_1)
      .find('.BSCards__slot-content')
      .should('be.empty')
      .get(s.CARD_SLOT_2)
      .find('.BSCards__slot-content')
      .should('be.empty')
      .get(s.CARD_SLOT_3)
      .find('.BSCards__slot-content')
      .should('be.empty')
  })
})