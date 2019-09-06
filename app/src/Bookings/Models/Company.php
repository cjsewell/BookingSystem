<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 11:12
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\ValidationResult;
    use SilverStripe\Security\Member;

    /**
     * Class Company
     * @package Bookings
     * @property string $Name
     */
    class Company extends DataObject {
        private static $table_name = "Company";
        private static $singular_name = "Company";
        private static $plurarl_name = "Companies";

        private static $db = [
            'Name' => 'Varchar(256)'
        ];

        private static $summary_fields = [
          'Name'
        ];

        private static $has_many = [
            'Rooms' => Room::class,
            'Clients' => Client::class
        ];

        private static $many_many = [
            'Members' => Member::class,
        ];

        public function validate()
        {
            $result =  parent::validate();
            try{
                $this->validation($result);
            }catch (\Exception $exc) {
                $result->addError($exc->getMessage());
            }

            return $result;
        }

        public function validation(ValidationResult $result){
            $this->getTrimData();

            if(strlen($this->Name) == 0)
                $result->addFieldError('Name', 'Company Name is required!');
        }


        public function onBeforeWrite()
        {
            parent::onBeforeWrite();
            $this->getTrimData();
        }

        /**
         * Trim data objects
         */
        public function getTrimData(){
            $this->Name;
        }
    }
}