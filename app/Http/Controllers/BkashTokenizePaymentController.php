<?php

namespace App\Http\Controllers;
use App\Models\Consultation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Karim007\LaravelBkashTokenize\Facade\BkashPaymentTokenize;
use Karim007\LaravelBkashTokenize\Facade\BkashRefundTokenize;

class BkashTokenizePaymentController extends Controller
{
    public function index()
    {
        return view('bkashT::bkash-payment');
    }
    public function createPayment(Request $request): \Illuminate\Http\RedirectResponse
    {
        $id = $request->query('id');
        $amount = $request->query('amount');
        $purpose = $request->query('purpose');
        $callback = $request->query('callback');
        $inv = uniqid();
        $request['intent'] = 'sale';
        $request['mode'] = '0011';
        $request['payerReference'] = $purpose.'_'.$id;
        $request['currency'] = 'BDT';
        $request['amount'] = $amount;
        $request['merchantInvoiceNumber'] = $inv;
        $request['callbackURL'] = $callback;
        $request_data_json = json_encode($request->all());

        $response =  BkashPaymentTokenize::cPayment($request_data_json);




        //$response =  BkashPaymentTokenize::cPayment($request_data_json,1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..

        //store paymentID and your account number for matching in callback request
        // dd($response) //if you are using sandbox and not submit info to bkash use it for 1 response

        if (isset($response['bkashURL'])) return redirect()->away($response['bkashURL']);
        else return redirect()->back()->with('error-alert2', $response['statusMessage']);
    }

    public function callBack(Request $request)
    {
        //callback request params
        // paymentID=your_payment_id&status=success&apiVersion=1.2.0-beta
        //using paymentID find the account number for sending params
        if ($request->status == 'success'){
            $response = BkashPaymentTokenize::executePayment($request->paymentID);
            //$response = BkashPaymentTokenize::executePayment($request->paymentID, 1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..
            if (!$response){ //if executePayment payment not found call queryPayment
                $response = BkashPaymentTokenize::queryPayment($request->paymentID);
                //$response = BkashPaymentTokenize::queryPayment($request->paymentID,1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..
            }

            if (isset($response['statusCode']) && $response['statusCode'] == "0000" && $response['transactionStatus'] == "Completed") {
                /*
                 * for refund need to store
                 * paymentID and trxID
                 * */
                $type = explode('_', $response['payerReference'])[0];
                $identifier = explode('_', $response['payerReference'])[1];

                if($type == 'Appointment'){
                    DB::table('payments')->insert([
                        'payment_id' => $response['paymentID'],
                        'trx_id' => $response['trxID'],
                        'payer_reference' => $response['payerReference'],
                        'merchant_invoice_number' => $response['merchantInvoiceNumber'],
                        'amount' => $response['amount'],
                        'currency' => $response['currency'],
                        'type' => $type,
                        'identifier' => $identifier,
                        'payer_account' => $response['payerAccount'],
                        'user_id' => auth()->id(),
                    ]);


                    $appointment = DB::table('appointments')
                        ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
                        ->select('appointments.*', 'doctors.name', 'doctors.specialty')
                        ->where('appointments.user_id', auth()->user()->id)
                        ->where('app_id', $identifier)
                        ->orderBy('date')
                        ->orderBy('time')
                        ->first();

                    //update appointment status
                    DB::table('appointments')
                        ->where('app_id', $identifier)
                        ->update([
                            'status' => 'paid',
                            'status_updated_at' => now(),
                        ]);

                    return Inertia::render('Payment/Success', ['appointment' => $appointment]);
                }
                else if($type == 'Consultation'){


                    DB::table('consultations')->insert([
                        'user_id' => auth()->id(),
                        'doc_id' => $identifier,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    DB::table('payments')->insert([
                        'payment_id' => $response['paymentID'],
                        'trx_id' => $response['trxID'],
                        'payer_reference' => $response['payerReference'],
                        'merchant_invoice_number' => $response['merchantInvoiceNumber'],
                        'amount' => $response['amount'],
                        'currency' => $response['currency'],
                        'type' => $type,
                        'identifier' => $identifier,
                        'payer_account' => $response['payerAccount'],
                        'user_id' => auth()->id(),
                    ]);


                    return Inertia::render('Payment/ConsultationSuccess');
                }



//                return BkashPaymentTokenize::success('Thank you for your payment', $response['trxID']);
            }
            return Inertia::render('Payment/Error', ['message' => $response['statusMessage']]);
//            return BkashPaymentTokenize::failure($response['statusMessage']);
        }else if ($request->status == 'cancel'){
//            return BkashPaymentTokenize::cancel('Your payment is can');
            return Inertia::render('Payment/Cancel');
        }else{
            return Inertia::render('Payment/Error', ['message' => 'Your transaction is failed']);
//            return BkashPaymentTokenize::failure('Your transaction is failed');
        }
    }

    public function searchTnx($trxID)
    {
        //response
        return BkashPaymentTokenize::searchTransaction($trxID);
        //return BkashPaymentTokenize::searchTransaction($trxID,1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..
    }

    public function refund(Request $request)
    {
        $paymentID='TR0011efndDr21736006000524';
        $trxID='CA46MBV70A';
        $amount=1;
        $reason='this is test';
        $sku='5';
        //response
        return BkashRefundTokenize::refund($paymentID,$trxID,$amount,$reason,$sku);
        //return BkashRefundTokenize::refund($paymentID,$trxID,$amount,$reason,$sku, 1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..
    }
    public function refundStatus(Request $request)
    {
        $paymentID='TR0011i9sAaps1735936426455';
        $trxID='CA46LJPORK';
        return BkashRefundTokenize::refundStatus($paymentID,$trxID);
        //return BkashRefundTokenize::refundStatus($paymentID,$trxID, 1); //last parameter is your account number for multi account its like, 1,2,3,4,cont..
    }
}
