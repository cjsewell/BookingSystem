<?php

namespace Bookings\Controllers {

    use SilverStripe\Control\Controller;
    use SilverStripe\Control\HTTPResponse;

    /**
     * Class BaseAPIController
     * @package Bookings\Controllers
     * Base controller class created
     */
    class BaseAPIController extends Controller
	{
        /**
         * @param $res
         * @return \SilverStripe\Control\HTTPResponse
         */
	    public function JsonResponse($res) : HTTPResponse
        {
	        return $this->getResponse()
                ->addHeader('Content-Type', 'application/json')
                ->setBody(json_encode($res));
        }
	}
}