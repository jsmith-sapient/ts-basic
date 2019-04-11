import { submit } from './api-form';
import ky from 'ky';


jest.mock('ky', () => ({
  get: jest.fn(() => ({
    json: jest.fn(),
  })).mockName('ky.get'),
  post: jest.fn(() => ({
    json: jest.fn(),
  })).mockName('ky.post'),
}));

interface MockForm {
  elements: {
    action: object,
    data: object,
    resource: object,
  };
}

const mockFormElm = (nodeName: string, name: string, props = {}) => ({
  name,
  nodeName,
  ...props
});

const triggerSubmit = (target: MockForm) => {
  const event = Object.create(null, {
    preventDefault: {
      enumerable: true,
      value: jest.fn().mockName('preventDefault'),
    },
    target: {
      enumerable: true,
      value: target,
    },
  });

  submit(event);

  return event;
};

describe('submit', () => {
  beforeEach(() => {
  });

  it('should prevent default event behaviour', () => {
    const { preventDefault } = triggerSubmit({
      elements: {
        action: mockFormElm('select', 'action', { value: 'get' }),
        resource: mockFormElm('input', 'resource', { value: 'cats' }),
        data: mockFormElm('textarea', 'data'),
      }
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  it('should use the supplied action', () => {
    triggerSubmit({
      elements: {
        action: mockFormElm('select', 'action', { value: 'post' }),
        resource: mockFormElm('input', 'resource', { value: 'cats' }),
        data: mockFormElm('textarea', 'data'),
      }
    });

    expect(ky.post).toHaveBeenCalled();
  });

  it('should use the supplied resource name', () => {
    const value = 'dogs';

    triggerSubmit({
      elements: {
        action: mockFormElm('select', 'action', { value: 'get' }),
        resource: mockFormElm('input', 'resource', { value }),
        data: mockFormElm('textarea', 'data'),
      }
    });

    expect(ky.get).toHaveBeenCalledWith(
      expect.stringContaining(value),
      {}
    );
  });

  it('should use the supplied data', () => {
    const value = {foo: 'bar'};

    triggerSubmit({
      elements: {
        action: mockFormElm('select', 'action', { value: 'get' }),
        resource: mockFormElm('input', 'resource', { value: 'cats' }),
        data: mockFormElm('textarea', 'data', { value }),
      }
    });

    expect(ky.get).toHaveBeenCalledWith(
      expect.anything(),
      { json: value }
    );
  });
});
