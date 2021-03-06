import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from 'react-toolbox/lib/button';
import { PricedButtonComponent } from './index';


describe('PricedButton', () => {
  let wrapper;
  const props = {
    fee: 5e8,
    onClick: sinon.spy(),
  };
  const insufficientBalance = 4.9999e8;
  const sufficientBalance = 6e8;

  it('renders <Button /> component from react-toolbox', () => {
    wrapper = shallow(<PricedButtonComponent {...props} balance={sufficientBalance} />);
    expect(wrapper.find(Button)).to.have.length(1);
  });

  describe('Sufficient funds', () => {
    beforeEach(() => {
      wrapper = shallow(<PricedButtonComponent {...props} balance={sufficientBalance} />);
    });

    it('renders a span saying "Fee: 5 SHIFT"', () => {
      expect(wrapper.find('span').text()).to.be.equal('Fee: 5 SHIFT');
    });

    it('allows to click on Button', () => {
      wrapper.find(Button).simulate('click');
      expect(props.onClick).to.have.been.calledWithExactly();
    });
  });

  describe('Insufficient funds', () => {
    beforeEach(() => {
      wrapper = shallow(<PricedButtonComponent {...props} balance={insufficientBalance} />);
    });

    it('renders a span saying "Insufficient funds for 5 SHIFT fee"', () => {
      expect(wrapper.find('span').text()).to.be.equal('Insufficient funds for 5 SHIFT fee');
    });

    it('sets the disabled attribute of the button', () => {
      const buttonProps = wrapper.find(Button).props();
      expect(buttonProps.disabled).to.be.equal(true);
    });
  });
});
