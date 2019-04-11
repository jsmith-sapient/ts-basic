import ky, {
  Options
} from '../node_modules/ky';


interface Form {
  elements: {
    action: HTMLSelectElement,
    resource: HTMLInputElement,
    data: HTMLTextAreaElement,
  };
}

interface FormEvent extends Partial<Event> {
  preventDefault(): void;
  target: Form & EventTarget;
}

const getFormVals = ({ target }: FormEvent) => {
  const {
    action: actionElm,
    resource: resourceElm,
    data: dataElm,
  } = target.elements;

  return {
    body: dataElm.value || undefined,
    action: (actionElm.value || 'get').toLowerCase(),
    resource: resourceElm.value,
  }
};

const outputDest = document.getElementById('output') as HTMLDivElement;

const submit = async (event: FormEvent) => {
  event.preventDefault();

  const {
    action,
    body,
    resource,
  } = getFormVals(event);

  const options: Options = {};

  if (body) options.json = body;

  const result: object = await ky[action](`./${resource}`, options).json();

  outputDest.textContent = JSON.stringify(result, null, 2);
};

export {
  getFormVals,
  submit,
  Form,
  FormEvent,
};
