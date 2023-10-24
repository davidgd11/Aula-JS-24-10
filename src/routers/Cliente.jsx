import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup'

function Cliente(){

  const[listaCliente, setListaCliente]= useState([])

  const scheme = yup.object({
    nome:yup.string().required("O campo nome obrigatório"),
    email:yup.string().email("Digite seu email").required("O campo email é obrigatório"),
    cpf:yup.string().min(11,"CPF deve conter 11 dígitos").required("O campo CPF é obrigatório")
  })

  .required()


  const{register, handleSubmit, formState:{errors}, setValue, setFocus, } = useForm({
    resolver:yupResolver(scheme),
  })

  /* funçao criar cliente */

  function inserirCliente(cliente){
    setListaCliente([...listaCliente, cliente]);
  }


  /* criando a API para ser chamada */

  function buscarCep(e){
    const cep = e.target.value.replace(/\D/g,'');
    fetch(`viacep.com.br/ws/${cep}/json/`)
      .then((res)=> res.json())
      .then((data)=> {
        setValue('rua',data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade',data.localidade);
        setFocus('numero');
      })

  }



  return(
    <>
      <form onSubmit = {handleSubmit(inserirCliente)}>
        <fieldset>
          <legend>Dados pessoais: </legend>
          <label htmlFor="">
            Nome: 
            <input type="text" {...register('nome')}/>
            <span>{errors.nome?.message}</span>
          </label>

          <label htmlFor="">
            E-mail: 
            <input type="text" {...register('email')}/>
            <span>{errors.email?.message}</span>
          </label>

          <label htmlFor="">
            CPF: 
            <input type="text" {...register('cpf')}/>
            <span>{errors .cpf?.message}</span>
          </label>
        </fieldset>



        <fieldset>
          <legend>
            Endereço: 
            <label htmlFor="">
              CEP:
              <input type="text" {...register('cep')} onBlur = {buscarCep} />
            </label>

            <label htmlFor="">
              Rua:
              <input type="text" {...register('rua')} />
            </label>

            <label htmlFor="">
              Número:
              <input type="text" {...register('numero')} />
            </label>

            <label htmlFor="">
              Bairro:
              <input type="text" {...register('bairro')} />
            </label>

            <label htmlFor="">
              Cidade:
              <input type="text" {...register('cidade')} />
            </label>

            <div>
              <button type="submit">Cadastrar</button>
              <button type="reset">Limpar</button>
            </div>

          </legend>
        </fieldset>
      </form>
    </>
  )
}
export default Cliente