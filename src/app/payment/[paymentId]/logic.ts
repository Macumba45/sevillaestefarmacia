import { stripePaymentTrue } from '@/services/payments'
import { getPaymentById } from '@/services/stripe'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getAuthenticatedToken } from '../../../../storage/storage'

export const useLogicPayment = () => {
    const token = getAuthenticatedToken()
    const router = useRouter()
    const [paymentIdMetadata, setPaymentIdMetadata] = useState<string[]>([])
    const paymentSuccess = async (paymentId: string) => {
        const payment = await stripePaymentTrue(paymentId)
        return payment
    }

    const getPaymentData = async (paymentId: string) => {
        const hourId = await getPaymentById(paymentId)
        await isBookedHour(hourId)
        return
    }

    const getChargeList = async (paymentId: string) => {
        try {
            const response = await fetch('/api/stripe/charge_list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                const findPaymentId = data
                    .map((event: any) => {
                        if (
                            event.data.object.metadata.paymentId === paymentId
                        ) {
                            return event.data.object.metadata.paymentId
                        }
                    })
                    .filter((paymentId: string) => paymentId !== undefined)

                setPaymentIdMetadata(findPaymentId)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isBookedHour = async (selectedHourId: string) => {
        const response = await fetch('/api/hours/isBooked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedHourId }),
        })

        const data = await response.json()
        return data
    }

    return {
        isBookedHour,
        paymentSuccess,
        router,
        getPaymentData,
        getChargeList,
        paymentIdMetadata,
    }
}
