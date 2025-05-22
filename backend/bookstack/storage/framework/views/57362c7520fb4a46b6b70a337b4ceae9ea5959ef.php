<main class="content-wrap mt-m card">
    <div class="grid half v-center no-row-gap">
        <h1 class="list-heading"><?php echo e(trans('entities.books')); ?></h1>
        <div class="text-m-right my-m">

            <?php echo $__env->make('entities.sort', ['options' => [
                'name' => trans('common.sort_name'),
                'created_at' => trans('common.sort_created_at'),
                'updated_at' => trans('common.sort_updated_at'),
            ], 'order' => $order, 'sort' => $sort, 'type' => 'books'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        </div>
    </div>
    <?php if(count($books) > 0): ?>
        <?php if($view === 'list'): ?>
            <div class="entity-list">
                <?php $__currentLoopData = $books; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $book): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $__env->make('books.parts.list-item', ['book' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        <?php else: ?>
             <div class="grid third">
                <?php $__currentLoopData = $books; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $book): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $__env->make('entities.grid-item', ['entity' => $book], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
             </div>
        <?php endif; ?>
        <div>
            <?php echo $books->render(); ?>

        </div>
    <?php else: ?>
        <p class="text-muted"><?php echo e(trans('entities.books_empty')); ?></p>
        <?php if(userCan('books-create-all')): ?>
            <a href="<?php echo e(url("/create-book")); ?>" class="text-pos"><?php echo icon('edit'); ?><?php echo e(trans('entities.create_now')); ?></a>
        <?php endif; ?>
    <?php endif; ?>
</main><?php /**PATH /var/www/bookstack/resources/views/books/parts/list.blade.php ENDPATH**/ ?>