import {NextResponse} from 'next/server';
import connectToDatabase from '@/libs/mongodb';
import Todo from '@/models/Todo'

export async function GET(request, context) {
    try {
        const { id } = await context.params;
        await connectToDatabase();

        const todo = await Todo.findById(id);
        if(!todo) {
            return NextResponse.json(
                { error: 'Todo not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch todo" },
            { status: 500 }
        );
    }
}

export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const {title, isRecorded} = body;

        await connectToDatabase();

        const todo = await Todo.findById(id);
        if(!todo) {
            return NextResponse.json(
                {error: 'Todo not found'},
                { status: 404 }
            );
        }
if(title !== undefined) todo.title = title;
if(isRecorded !== undefined) todo.isRecorded = isRecorded;

await todo.save();
return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update todo' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, context) {
    try {
        const {id} = await context.params;
        await connectToDatabase();

        const todo = await Todo.findByIdAndDelete(id);
        if(!todo) {
            return NextResponse.json(
                {error: 'Todo not found'},
                {staus: 404}
            )
        }
        return NextResponse.json({message: 'Todo deleted successfully'});
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete todo' },
            { status: 500 }
        );
    }
}