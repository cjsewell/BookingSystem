<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-07
 * Time: 12:36
 */

namespace Bookings\Controllers {

    /**
     * Class ClientController
     * @package Bookings\Controllers
     */
    class ClientController extends BaseAPIController {

        private static $allowed_actions = [
            'ListClients',
        ];

        private static $url_handlers = [
            'list/$ID' => 'ListClients'
        ];

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
                        'Company' => $companies->toMap(),
                        'Rooms' => $companies->Clients()->Column('Name')
                    ];
                }
            }
            return BaseAPIController::create()->JsonResponse($response);
        }
    }
}