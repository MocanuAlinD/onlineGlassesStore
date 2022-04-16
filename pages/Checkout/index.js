import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import styles from '../../styles/CheckoutComponents/Checkout.module.css'
import AddressForm from '../../components/Checkout/AddressForm'
import PaymentForm from '../../components/Checkout/PaymentForm'
import { commerce } from '../../lib/commerce'
import Link from 'next/link'
import { useRouter } from 'next/router';

// const steps = ["Shipping address", "Payment details"]
const steps = ["Adresa livrare", "Detalii plata"]

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)

    const router = useRouter();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Form = () => (activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} next={next} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout} cart={cart} />)

    let Confirmation = () => order.customer ? (
        <>
            <Typography variant="h5">
                Multumim pentru comanda, {order.customer.firstname} {order.customer.lastname}
            </Typography>
            <Divider style={{ margin: ".5rem 0" }} />
            <Typography variant="subtitle2">
                Comanda nr: {order.customer_reference}
            </Typography> <br />
            <Link href='/'><Button variant="outlined" type="button">Pagina principala</Button></Link>
        </>
    ) : isFinished ? (
        <>
            <Typography variant="h5">
                Multumim pentru comanda!
            </Typography>
            <Divider />
            <Link href='/'><Button variant="outlined" type="button">Pagina principala</Button></Link>
        </>
    ) : (
        <div className={styles.checkout__spinner}>
            <CircularProgress />
        </div >
    )

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography> <br />
            <Link href='/'><Button variant="outlined" type="button">Pagina principala</Button></Link>
        </>
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch {
                    router.push('/');
                }
            };
            generateToken();
        }
    }, [cart])

    return (
        <div className={styles.checkout__container}>
            <div className={styles.checkout__wrapper}>
                <Paper variant="outlined" className={styles.checkout__paper}>
                    <Typography variant="h4" align="center" >Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel className={styles.checkout__stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </div>
        </div>
    )
}




export default Checkout


