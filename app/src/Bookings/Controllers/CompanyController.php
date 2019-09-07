<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-06
 * Time: 22:52
 */

namespace Bookings\Controllers {

    use SilverStripe\Dev\Debug;
    use SilverStripe\ORM\ArrayList;
    use SilverStripe\Security\PermissionFailureException;
    use SilverStripe\View\ArrayData;

    /**
     * Class CompanyController
     * @package Bookings\Controllers
     */
    class CompanyController extends BaseAPIController {

        private static $allowed_actions = [
            'ListCompanies',
            'ListRooms'
        ];

        private static $url_handlers = [
            'list/space/$ID' => 'ListRooms',
            'list' => 'ListCompanies',
        ];

        /**
         * Returns a list of companies that are associated to the logged in member
         *
         * @return \SilverStripe\Control\HTTPResponse
         * @throws PermissionFailureException
         */
        public function ListCompanies(){
            $member = $this->getLoggedInUser();
            if ($member->Companies()){
                $data = ArrayList::create();
                foreach ($member->Companies() as $item){
                    $item = [
                        'ID' => $item->ID,
                        'Name' => $item->Name
                    ];
                    $data->add($item);
                }
                return BaseAPIController::create()
                    ->JsonResponse($data->toNestedArray());
            }
        }


        /**
         * Returns the all the spaces/rooms that are associated to a particular company
         *
         * @return \SilverStripe\Control\HTTPResponse
         * @throws PermissionFailureException
         */
        public function ListRooms(){
            $member = $this->getLoggedInUser();
            $id = $this->getRequest()->param('ID');
            if($member){
                $comapny = $member->Companies()->find('ID', $id);
                if(!$comapny){
                    $response = [
                        'success' => false,
                        'message' => 'ID not found'
                    ];
                }else{
                    $response = [
                        'Company' => $comapny,
                        'Rooms' => $comapny->Rooms()->Column('Name')
                    ];
                }
            }
            return BaseAPIController::create()
                ->JsonResponse($response);
        }
    }
}