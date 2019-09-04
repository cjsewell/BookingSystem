<?php
/**
 * Created by PhpStorm.
 * User: kartik
 * Date: 2019-09-04
 * Time: 15:40
 */

namespace Bookings\Models {

    use SilverStripe\Dev\Debug;
    use SilverStripe\ORM\DataObject;
    use SilverStripe\ORM\FieldType\DBDatetime;
    use SilverStripe\ORM\ValidationResult;

    /**
     * Class Reservation
     * @package Bookings\Models
     * @property DBDatetime $StartDate
     * @property DBDatetime $EndDate
     * @property Boolean $ExistingClient
     * @property string TempClient
     * @property Boolean $BlockSpace
     * @property string $Notes
     */
    class Reservation extends DataObject {
        private static $table_name = "Reservation";
        private static $singular_name = "Reservation";
        private static $plurarl_name = "Reservations";

        private static $db = [
            'StartDate' => 'DBDatetime',
            'EndDate' => 'DBDatetime',
            'ExistingClient' => 'Boolean',
            'TempClient' => 'Varchar(256)',
            'BlockSpace' => 'Boolean',
            'Notes' => 'Text'
        ];

        private static $has_one = [
            'Room' => Room::class
        ];

        private static $summary_fields = [
            'Room.Name' => 'Room',
            'StartDate',
            'EndDate'
        ];

        public function validate()
        {
            $result = parent::validate();
            try{
                $this->validation($result);
            }catch (\Exception $exc){
                $result->addError($exc->getMessage());
            }
            return $result;
        }

        public function validation(ValidationResult $result){
           if(!$this->dbObject('StartDate')->exists())
               $result->addFieldError('StartDate', 'Start Date is required!');

           if(!$this->dbObject('EndDate')->exists())
               $result->addFieldError('EndDate', 'End Date is required!');
        }

        public function getTrimData(){
            $this->Notes;
        }

        public function onBeforeWrite()
        {
            parent::onBeforeWrite();
            $this->getTrimData();

        }
    }
}