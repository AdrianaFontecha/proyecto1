import { useState } from 'react';
  import { RegisterAuthUseCase } from '../../../domain/useCases/auth/RegisterAuth';

  const RegisterViewModel = () => {
      const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
      };
      const register = async () => {
        const response = await RegisterAuthUseCase(values);
        console.log('Result: ' + JSON.stringify(response));
      }
      return {
        ...values,
        onChange,
        register
      };
  }

  export default RegisterViewModel;