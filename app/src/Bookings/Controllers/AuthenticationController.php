<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-05
 * Time: 17:06
 */

namespace Bookings\Controllers {

    use SilverStripe\Control\HTTPRequest;
    use SilverStripe\Control\HTTPResponse;
    use SilverStripe\Core\Injector\Injector;
    use SilverStripe\ORM\ValidationResult;
    use SilverStripe\Security\MemberAuthenticator\CookieAuthenticationHandler;
    use SilverStripe\Security\MemberAuthenticator\MemberAuthenticator;
    use SilverStripe\Security\Security;

    /**
     * Class AuthenticationController
     * @package Bookings\Controllers
     */
    class AuthenticationController extends BaseAPIController {

        private static $allowed_actions = [
            'WhoAmI',
            'Login',
            'Logout'
        ];

        private static $url_handlers = [
          'whoami' => 'WhoAmI',
          'login' => 'Login',
          'logout' => 'Logout'
        ];

        public function Login(HTTPRequest $request) : HTTPResponse
        {
            $response = [
                'success' => 'There is has been a error login in',
                'member' => false
            ];

            $body = json_decode($request->getBody());
            if($body && $body->username && $body->password) {
                $result = new ValidationResult();
                $authenticate = new MemberAuthenticator();
                $data = [
                    'Email' => $body->username,
                    'Password' => $body->password
                ];

                $member = $authenticate->authenticate($data, $request, $result);
                $messages = $result->getMessages();
                $error = '';

                if($messages)
                    $error = isset($messages[0]['message']) ? $messages[0]['message'] : '';

                if($result->isValid()) {
                    $this->getLoginHandler()->logIn($member, true, $request);
                }

                $response = [
                    'success' => $result->isValid() ? true : false,
                    'message' => $result->isValid() ? "Successfully logged in" : $error,
                    'member' => $result->isValid() ? $member->toMap() : null
                ];
            }

            return BaseAPIController::create()->JsonResponse($response);
        }

        /**
         * @param HTTPRequest $request
         * @return HTTPResponse
         * logs user out
         */
        public function Logout(HTTPRequest $request){
            try {
                $this->getLoginHandler()->logOut($request);
                $response = [
                    'success' => true,
                    'message' => 'Signed out successfully'
                ];
            }catch (\Exception $exc) {
                $response = [
                    'success' => false,
                    'message' => $exc->getMessage()
                ];
            }

            return BaseAPIController::create()->JsonResponse($response);
        }

        /**
         * @return \SilverStripe\Control\HTTPResponse
         */
        public function WhoAmI(){
            $member = Security::getCurrentUser();
            $response = [
                'success' => $member ? true : false,
                'member' => $member ? $member->toMap() : null
            ];

            return BaseAPIController::create()->JsonResponse($response);
        }

        /**
         * @return mixed
         */
        public function getLoginHandler(){
            return Injector::inst()->get(CookieAuthenticationHandler::class);
        }
    }
}