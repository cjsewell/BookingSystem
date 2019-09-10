<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-07
 * Time: 12:36
 */

namespace Bookings\Controllers {

    use Bookings\Models\Client;
    use SilverStripe\Control\HTTPRequest;

    /**
     * Class ClientController
     * @package Bookings\Controllers
     */
    class ClientController extends BaseAPIController {

        private static $allowed_actions = [
            'ListClients',
            'Save',
            'Delete'
        ];

        private static $url_handlers = [
            'list/$ID' => 'ListClients',
            'save' => 'Save',
            'delete' => 'Delete'
        ];

        /**
         * @return \SilverStripe\Control\HTTPResponse
         * @throws \SilverStripe\Security\PermissionFailureException
         */
        public function ListClients(){
            $member = $this->getLoggedInUser();
            $id = $this->getRequest()->param('ID');
            if($member){
                $companies = $member->Companies()->find('ID', $id);
                if(!$companies){
                    $response = [
                        'success' => false,
                        'message' => 'ID not found'
                    ];
                }else{
                    $response = [
                        'Company' => $companies->Name,
                        'Clients' => $companies->Clients()->toNestedArray()
                    ];
                }
            }
            return $this->JsonResponse($response);
        }

        public function Save(){
            return null;
        }

        public function Delete(HTTPRequest $request){
            $body = json_decode($request->getBody());
            $response = [
                'success' => false,
                'message' => 'There was no body posted'
            ];
            if($body && $body->ID){
                $client = Client::get()->byID($body->ID);
                if($client && $client->ID > 0){
                    try {
                        $client->delete();
                        $response = [
                            'success' => true,
                            'message' => 'Successfully deleted ' . $body->FirstName . ' ' . $body->LastName
                        ];
                    }catch (\Exception $exc) {
                        $response = [
                            'success' => false,
                            'message' => $exc->getMessage()
                        ];
                    }
                }
            }
            return $this->JsonResponse($response);
        }
    }
}
