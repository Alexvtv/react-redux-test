import { toast } from 'react-toastify'

export const toastFunc = (mode, text) => {
	if(mode === 'standart') {
		return toast.dark(text, {autoClose: 2500})
	} else if(mode === 'error') {
		return toast.error(text, {autoClose: 2500})
	}
}