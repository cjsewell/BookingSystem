<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 15:30
 */

namespace Bookings\Models {

    use function GuzzleHttp\Psr7\str;
    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\ValidationResult;

    /**
     * Class ClientPage
     * @package Bookings\Models
     * @property string $Name
     * @property string $Email
     * @property string $Phone
     * @property string $Mobile
     * @property string $Address
     */
    class Client extends DataObject {
        private static $table_name = "ClientPage";
        private static $singular_name = "ClientPage";
        private static $plurarl_name = "Clients";

        private static $db = [
            'Name' => 'Varchar(64)',
            'Email' => 'Varchar(256)',
            'Phone' => 'Varchar(64)',
            'Mobile' => 'Varchar(64)',
            'Address' => 'Text',
        ];

        private static $has_one = [
            'Company' => Company::class
        ];

        private static $summary_fields = [
          'Name',
          'Email',
          'Phone',
          'Mobile',
          'Address'
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

        public function validation (ValidationResult $result){
            $this->getTrimData();
            if(strlen($this->Name) == 0)
                $result->addFieldError('Name', 'Name field is required!');

            if(strlen($this->Email) == 0)
                $result->addFieldError('Email', 'Email field is required!');

            if(!strlen($this->Phone) > 0 && strlen($this->Mobile) == 0)
                $result->addFieldError('Mobile', 'Mobile field is required!');

            if(!strlen($this->Mobile) > 0 && strlen($this->Phone) == 0)
                $result->addFieldError('Phone', 'Phone field is required!');
        }

        /**
         * Trim all data before writing to database
         */
        public function getTrimData(){
            $this->Name = trim($this->Name);
            $this->Email = trim($this->Email);
            $this->Phone = trim($this->Phone);
            $this->Mobile = trim($this->Mobile);
            $this->Address = trim($this->Address);
        }

        public function onBeforeWrite()
        {
            parent::onBeforeWrite();
            $this->getTrimData();
        }
    }
}