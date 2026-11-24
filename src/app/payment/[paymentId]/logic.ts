import { useEffect, useState } from 'react'
import { confirmRedsysPayment, fetchPaymentById } from '@/services/payments'
import { fetchDateById } from '@/services/dates'
import { fetchHourById } from '@/services/hours'

const SIGNED_PARAMS = ['Ds_SignatureVersion', 'Ds_MerchantParameters', 'Ds_Signature']

// Solo lectura: el pago lo marca el servidor tras verificar la firma de Redsys
export const useLogicPayment = (paymentId: string) => {
    const [isLoading, setIsLoading] = useState(true)
    const [payed, setPayed] = useState(false)
    const [serviceId, setServiceId] = useState('')
    const [fecha, setFecha] = useState('')
    const [hour, setHour] = useState('')

    useEffect(() => {
        const load = async () => {
            const query = new URLSearchParams(window.location.search)
            if (query.get('Ds_Signature')) {
                await confirmRedsysPayment(
                    Object.fromEntries(
                        SIGNED_PARAMS.map(k => [k, query.get(k) ?? ''])
                    )
                )
            }
            const payment = await fetchPaymentById(paymentId)
            if (payment) {
                setPayed(payment.payed)
                setServiceId(payment.serviceId)
                if (payment.dateId)
                    setFecha((await fetchDateById(payment.dateId))?.dates ?? '')
                if (payment.hourId)
                    setHour((await fetchHourById(payment.hourId))?.hour ?? '')
            }
            setIsLoading(false)
        }
        load()
    }, [paymentId])

    return { isLoading, payed, serviceId, fecha, hour }
}
