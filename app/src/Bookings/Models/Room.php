<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 13:09
 */

namespace Bookings\Models {

    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\ValidationResult;

    /**
     * Class Room
     * @package Bookings\Models
     * @property string $Name
     */
    class Room extends DataObject {
        private static $table_name = "Room";
        private static $singular_name = "Room";
        private static $plurarl_name = "Rooms";

        private static $db = [
            'Name' => 'Varchar(256)'
        ];

        private static $summary_fields = [
            'Name'
        ];

        private static $has_one = [
            'Company' => Company::class
        ];

        private static $has_many = [
            'Reservations' => Reservation::class
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
                $result->addFieldError('Name', 'Name is required!');
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