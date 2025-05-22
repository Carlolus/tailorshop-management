<?php $__env->startSection('body'); ?>
    <?php echo $__env->make('books.parts.list', ['books' => $books, 'view' => $view], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('left'); ?>
    <?php if($recents): ?>
        <div id="recents" class="mb-xl">
            <h5><?php echo e(trans('entities.recently_viewed')); ?></h5>
            <?php echo $__env->make('entities.list', ['entities' => $recents, 'style' => 'compact'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    <?php endif; ?>

    <div id="popular" class="mb-xl">
        <h5><?php echo e(trans('entities.books_popular')); ?></h5>
        <?php if(count($popular) > 0): ?>
            <?php echo $__env->make('entities.list', ['entities' => $popular, 'style' => 'compact'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php else: ?>
            <div class="body text-muted"><?php echo e(trans('entities.books_popular_empty')); ?></div>
        <?php endif; ?>
    </div>

    <div id="new" class="mb-xl">
        <h5><?php echo e(trans('entities.books_new')); ?></h5>
        <?php if(count($popular) > 0): ?>
            <?php echo $__env->make('entities.list', ['entities' => $new, 'style' => 'compact'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php else: ?>
            <div class="body text-muted"><?php echo e(trans('entities.books_new_empty')); ?></div>
        <?php endif; ?>
    </div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('right'); ?>

    <div class="actions mb-xl">
        <h5><?php echo e(trans('common.actions')); ?></h5>
        <div class="icon-list text-primary">
            <?php if(user()->can('book-create-all')): ?>
                <a href="<?php echo e(url("/create-book")); ?>" class="icon-list-item">
                    <span><?php echo icon('add'); ?></span>
                    <span><?php echo e(trans('entities.books_create')); ?></span>
                </a>
            <?php endif; ?>

            <?php echo $__env->make('entities.view-toggle', ['view' => $view, 'type' => 'books'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

            <a href="<?php echo e(url('/tags')); ?>" class="icon-list-item">
                <span><?php echo icon('tag'); ?></span>
                <span><?php echo e(trans('entities.tags_view_tags')); ?></span>
            </a>
        </div>
    </div>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.tri', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/books/index.blade.php ENDPATH**/ ?>