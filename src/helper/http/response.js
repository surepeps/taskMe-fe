import { toast } from 'react-toastify';

export const responseCatcher = (error) => {
  const status = error.response ? error.response.status : null;
  const errorMessage = error.response ? error.response.data.error : null;

  switch (status) {
    case 200:
      // Handle successful responses with status code 200 (OK)
      toast.success('Success message', commonToastOptions);
      break;

    case 201:
      // Handle responses with status code 201 (Created)
      toast.success('Resource created successfully', commonToastOptions);
      break;

    case 204:
      // Handle responses with status code 204 (No Content)
      toast.info('No content found', commonToastOptions);
      break;

    case 400:
      toast.error(errorMessage, commonToastOptions);
      break;

    case 401:
      toast.error(errorMessage || 'Unauthorized', commonToastOptions);
      break;

    case 403:
      toast.error(errorMessage || 'Forbidden', commonToastOptions);
      break;

    case 404:
      toast.error(errorMessage || 'Not found', commonToastOptions);
      break;

    case 422:
      // eslint-disable-next-line no-case-declarations
      const validationErrors = error.response.data.errors;
      for (const fieldName in validationErrors) {
        if (validationErrors.hasOwnProperty(fieldName)) {
          toast.error(validationErrors[fieldName][0], commonToastOptions);
        }
      }
      break;

    case 500:
      toast.error('Internal server error', commonToastOptions);
      break;

    default:
      toast.error(status ? 'An error occurred' : 'Network error', commonToastOptions);
      break;
  }
};

const commonToastOptions = {
  position: 'top-right',
  autoClose: 3000,
};
