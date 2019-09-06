<?php

namespace Bookings\Controllers {

    use SilverStripe\Control\Controller;
    use SilverStripe\Control\HTTPResponse;
    use SilverStripe\Security\PermissionFailureException;
    use SilverStripe\Security\Security;

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

        /**
         * @return \SilverStripe\Security\Member|null
         * @throws PermissionFailureException
         */
        public function getLoggedInUser(){
	        $member = Security::getCurrentUser();
	        if($member){
	            return $member;
            }
	        throw new PermissionFailureException('User is not logged in. Please sign in to access the data');
        }
	}
}