<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 15:30
 */

namespace Bookings\Models {

    use function GuzzleHttp\Psr7\str;
    use SilverStripe\Dev\Debug;
    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\ValidationResult;

    /**
     * Class ClientPage
     * @package Bookings\Models
     * @property string $FirstName
     * @property string $LastName
     * @property string $Email
     * @property string $Phone
     * @property string $Mobile
     * @property string $Address
     */
    class Client extends DataObject
    {
        private static $table_name = "Client";
        private static $singular_name = "Client";
        private static $plurarl_name = "Clients";

        private static $db = [
            'FirstName' => 'Varchar(64)',
            'LastName' => 'Varchar(64)',
            'Email' => 'Varchar(256)',
            'Phone' => 'Varchar(64)',
            'Mobile' => 'Varchar(64)',
            'Address' => 'Text',
        ];

        private static $has_one = [
            'Company' => Company::class
        ];

        private static $summary_fields = [
            'FirstName',
            'LastName',
            'Email',
            'Phone',
            'Mobile',
            'Address'
        ];

        public function validate()
        {
            $result = parent::validate();
            try {
                $this->validation($result);
            } catch (\Exception $exc) {
                $result->addError($exc->getMessage());
            }

            return $result;
        }

        public function validation(ValidationResult $result)
        {
            $this->getTrimData();
            if (strlen($this->FirstName) == 0)
                $result->addFieldError('FirstName', 'First Name field is required!');

            if (strlen($this->LastName) == 0)
                $result->addFieldError('LastName', 'Last Name field is required!');

            $client = Client::get()
                ->filter(['FirstName' => $this->FirstName, 'LastName' => $this->LastName])
                ->first();
            if ($client && $client->ID !== $this->ID) {
                $result->addError("User with " . $this->FirstName . " and " . $this->LastName . ' already exist');
            }

            if (strlen($this->Email) == 0)
                $result->addFieldError('Email', 'Email field is required!');

            if (!strlen($this->Phone) > 0 && strlen($this->Mobile) == 0)
                $result->addFieldError('Mobile', 'Mobile field is required!');

            if (!strlen($this->Mobile) > 0 && strlen($this->Phone) == 0)
                $result->addFieldError('Phone', 'Phone field is required!');
        }

        /**
         * Trim all data before writing to database
         */
        public function getTrimData()
        {
            $this->FirstName = trim($this->FirstName);
            $this->LastName = trim($this->LastName);
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
