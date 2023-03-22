<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateRequest;
use App\Http\Requests\Task\EditRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Tasks;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($filter = false): JsonResource
    {

        if($filter) {
            $tasks = Tasks::orderBy("created_at", $filter)->get();
        }else{
            $tasks = Tasks::all();
        }
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request): JsonResource
    {
        $data = $request->validated();

        $task = Tasks::create($data);

        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditRequest $request, Tasks $task): JsonResource
    {
        $data = $request->validated();

        $task->update($data);

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tasks $task):void
    {
        $task->delete();
    }
}
