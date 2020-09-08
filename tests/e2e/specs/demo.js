/**
 * @fileoverview Demo E2E tests
 */

//Benchy ArrayBuffers
let benchyGCODE;
let benchySTL;

describe('demo', () => 
{
  before(() =>
  {
    cy.task('readBinary', './assets/benchy.gcode').then(async gcode =>
    {
      //Convert to ArrayBuffer
      benchyGCODE = new Uint8Array(JSON.parse(gcode)).buffer;
    });

    cy.task('readBinary', './assets/benchy.stl').then(async stl =>
    {
      //Convert to ArrayBuffer
      benchySTL = new Uint8Array(JSON.parse(stl)).buffer;
    });
  });

  it('renders everything', () => 
  {
    cy.visit('/');

    cy.get('[data-e2e=three-d-viewer] > canvas').should('be.visible');
    cy.get('[data-e2e=toggle-menu]').should('be.visible');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=menu]').should('be.visible');
    cy.get('[data-e2e=plane-x]').should('be.visible');
    cy.get('[data-e2e=plane-y]').should('be.visible');
    cy.get('[data-e2e=position-x]').should('be.visible');
    cy.get('[data-e2e=position-y]').should('be.visible');
    cy.get('[data-e2e=position-z]').should('be.visible');
    cy.get('[data-e2e=rotation-x]').should('be.visible');
    cy.get('[data-e2e=rotation-y]').should('be.visible');
    cy.get('[data-e2e=rotation-z]').should('be.visible');
    cy.get('[data-e2e=scale-x]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=scale-y]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=scale-z]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=primary-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=secondary-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=plane-color]').scrollIntoView().should('be.visible');
    cy.get('[data-e2e=background-color]').scrollIntoView().should('be.visible');
  });

  it('updates the plane', () =>
  {
    cy.visit('/');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=plane-x]').clear().type('15{enter}');
    cy.get('[data-e2e=plane-y]').clear().type('16.5{enter}');

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.plane.scale.x).to.equal(15);
      expect(state.plane.scale.y).to.equal(16.5);
    });
  });

  it('updates the position', () =>
  {
    const x = 10;
    const y = -5.5;
    const z = 4.3;

    cy.visit('/');

    //Upload
    cy.upload('Benchy.gcode', benchyGCODE, 'text/plain', '[data-e2e=file-input]');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=position-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=position-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=position-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.meshes[0].position.x).to.equal(x);
      expect(state.meshes[0].position.y).to.equal(y);
      expect(state.meshes[0].position.z).to.equal(z);
    });
  });

  it('updates the rotation', () =>
  {
    const x = 45;
    const y = 135;
    const z = -100;

    cy.visit('/');

    //Upload
    cy.upload('Benchy.gcode', benchyGCODE, 'text/plain', '[data-e2e=file-input]');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=rotation-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=rotation-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=rotation-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.meshes[0].rotation.x).to.equal(x * (Math.PI / 180));
      expect(state.meshes[0].rotation.y).to.equal(y * (Math.PI / 180));
      expect(state.meshes[0].rotation.z).to.equal(z * (Math.PI / 180));
    });
  });

  it('updates the scale', () =>
  {
    const x = 0.2;
    const y = 1;
    const z = 4.3;

    cy.visit('/');

    //Upload
    cy.upload('Benchy.gcode', benchyGCODE, 'text/plain', '[data-e2e=file-input]');

    cy.get('[data-e2e=toggle-menu]').click();

    cy.get('[data-e2e=scale-x]').clear().type(`${x}{enter}`);
    cy.get('[data-e2e=scale-y]').clear().type(`${y}{enter}`);
    cy.get('[data-e2e=scale-z]').clear().type(`${z}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.meshes[0].scale.x).to.equal(x);
      expect(state.meshes[0].scale.y).to.equal(y);
      expect(state.meshes[0].scale.z).to.equal(z);
    });
  });

  it('updates the theme', () =>
  {
    const backgroundColor = '#fcba03';
    const planeColor = '#32a852';
    const primaryColor = '#eb4034';
    const secondaryColor = '#4287f5';

    cy.visit('/');

    //Upload
    cy.upload('Benchy.gcode', benchyGCODE, 'text/plain', '[data-e2e=file-input]');

    cy.get('[data-e2e=toggle-menu]').click();

    //Set color pickers to hex code
    cy.get('[data-e2e=background-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=plane-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=primary-color]').children().eq(1).children().eq(1).children().eq(3).click().click();
    cy.get('[data-e2e=secondary-color]').children().eq(1).children().eq(1).children().eq(3).click().click();

    cy.get('[data-e2e=background-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${backgroundColor}{enter}`);
    cy.get('[data-e2e=plane-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${planeColor}{enter}`);
    cy.get('[data-e2e=primary-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${primaryColor}{enter}`);
    cy.get('[data-e2e=secondary-color]').children().eq(1).children().eq(1).children().eq(0).children().eq(0).clear().type(`${secondaryColor}{enter}`);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(`#${state.scene.background.getHexString()}`).to.equal(backgroundColor);
      expect(`#${state.plane.material.color.getHexString()}`).to.equal(planeColor);
      expect(`#${state.meshes[0].material.color.getHexString()}`).to.equal(primaryColor);
      expect(`#${state.meshes[1].material.color.getHexString()}`).to.equal(secondaryColor);
    });
  });

  it('updates the meshes', () =>
  {
    cy.visit('/');

    //Upload
    cy.upload('Benchy.stl', benchySTL, 'model/stl', '[data-e2e=file-input]');

    cy.wait(1000);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.meshes).to.not.be.null;
      expect(state.meshes).to.have.length(1);
    });

    cy.upload('Benchy.gcode', benchyGCODE, 'text/plain', '[data-e2e=file-input]');

    cy.wait(2000);

    cy.window().then(window =>
    {
      const state = window.getVue3dViewerState();

      expect(state.meshes).to.not.be.null;
      expect(state.meshes).to.have.length(2);
    });
  });
});
