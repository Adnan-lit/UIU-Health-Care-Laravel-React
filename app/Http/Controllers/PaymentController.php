<?php

namespace App\Http\Controllers;


use DGvai\SSLCommerz\SSLCommerz;
use App\Http\Controllers\Controller;
use App\Library\SslCommerz\SslCommerzNotification;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function order(Request $request)
    {
        $post_data = array();
        $post_data['total_amount'] = $request->amount;
        $post_data['currency'] = "BDT";
        $post_data['tran_id'] = uniqid();

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = $request->name;
        $post_data['cus_email'] = $request->email;
        $post_data['cus_add1'] = $request->address;
        $post_data['cus_phone'] = $request->phone;

        $sslc = new SslCommerzNotification();
        
        try {
            $payment_options = $sslc->makePayment($post_data, 'hosted');
            if (!is_array($payment_options)) {
                print_r($payment_options);
                $payment_options = array();
            }
        } catch (\Exception $e) {
            \Log::error('SSL Payment Error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Payment initialization failed');
        }
    }

    public function success(Request $request)
    {
        $validate = SSLCommerz::validate_payment($request);
        if($validate)
        {
            $bankID = $request->bank_tran_id;   //  KEEP THIS bank_tran_id FOR REFUNDING ISSUE
//            ...
//            //  Do the rest database saving works
//            //  take a look at dd($request->all()) to see what you need
//            ...
        }
    }

    public function failure(Request $request)
    {
//        ...
//        //  do the database works
//        //  also same goes for cancel()
//        //  for IPN() you can leave it untouched or can follow
//        //  official documentation about IPN from SSLCommerz Panel
//        ...
    }
}
