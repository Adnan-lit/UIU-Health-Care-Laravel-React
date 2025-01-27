<?php

namespace App\Http\Controllers;

use App\Models\InventoryMedicine;
use App\Models\Medicine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PharmacyController extends Controller
{
    public function index()
    {
        return Inertia::render('Pharmacist/Dashboard');
    }


    public function medicine()
    {

        $medicineQuery = Medicine::query();

        if (request('generic_name')) {
            $medicineQuery->where('generic_name', 'like', '%' . request('generic_name') . '%');
        }
        if (request('brand_name')) {
            $medicineQuery->where('brand_name', 'like', '%' . request('brand_name') . '%');
        }

        $allMedicines = $medicineQuery->paginate(10)->onEachSide(1);

        $allGroupName = Medicine::query()
            ->select('generic_name') // Fetching generic_name
            ->distinct() // Fetching distinct values
            ->get(); // Get the result

        // Query for inventory by medicine_id
        $inventoryQuery = InventoryMedicine::query()
            ->select('medicine_id', 'stock') // Fetching medicine_id and quantity
            ->get(); // Get the result

        return Inertia::render('Pharmacist/Medicine', [
            'allMedicines' => $allMedicines,
            'inventory' => $inventoryQuery, // Passing inventory data
            'groupNames' => $allGroupName, // Passing generic_name data
        ]);
    }


    public function showMedicine($id)
    {
        $medicine = Medicine::query()
            ->where('medicine_id', $id)
            ->first();

        $inventory = InventoryMedicine::query()
            ->where('medicine_id', $id)
            ->first();

        return Inertia::render('Pharmacist/MedicineShow', [
            'medicine' => $medicine,
            'inventory' => $inventory,
        ]);
    }


    public function updateInventory(Request $request)
    {
        $request->validate([
            'medicine_id' => 'required',
            'stock' => 'required',
        ]);

        // use createOrUpdate method to update the stock
        InventoryMedicine::updateOrCreate(
            ['medicine_id' => $request->medicine_id],
            ['stock' => $request->stock]
        );

        return redirect()->route('pharmacist.medicine');
    }
}
