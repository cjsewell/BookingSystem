<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-05
 * Time: 17:06
 */

namespace Bookings\Controllers {

    use SilverStripe\Control\Controller;
    use SilverStripe\Security\Security;

    /**
     * Class AuthenticationController
     * @package Bookings\Controllers
     */
    class AuthenticationController extends Controller {

        private static $allowed_actions = [
            'WhoAmI'
        ];

        private static $url_handlers = [
          'whoami' => 'WhoAmI'
        ];

        /**
         * @return \SilverStripe\Control\HTTPResponse
         */
        public function WhoAmI(){
            $member = Security::getCurrentUser();
            $response = [
                'success' => $member ? true : false,
                'member' => $member ? $member->toMap() : null
            ];

            return $this->getResponse()
                ->addHeader('Content-Type', 'application/json')
                ->setBody(json_encode($response));
        }
    }
}