import { PeppersPage } from './app.po';

describe('peppers App', () => {
  let page: PeppersPage;

  beforeEach(() => {
    page = new PeppersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
