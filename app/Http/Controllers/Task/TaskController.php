<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\CreateRequest;
use App\Http\Requests\Task\EditRequest;
use App\Http\Requests\Task\FilterRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Tasks;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(FilterRequest $request): JsonResource
    {
        $data = $request->validated();

        $query = Tasks::query();
        if (isset($data['sort']) && $data['sort'] != 'all') {
            $query->where('status', $data['sort']);
        }

        //var_dump($tasks);
        /*$tasks = Tasks::withTrashed()->get();
        foreach ($tasks as $task) {
           $task->restore();
       }*/

        $tasks = $query->latest()->paginate(5, ['*'], 'page', $data['page']);

        $now = Carbon::now()->timestamp;

        foreach ($tasks as $task) {
            $is = Carbon::parse($task->deadline)->timestamp;
            if ($now > $is) {
                $task->status = 'canceled';
                $task->save();
            }
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

        $task->refresh();

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
    public function destroy(Tasks $task): void
    {
        $task->delete();
    }
}
