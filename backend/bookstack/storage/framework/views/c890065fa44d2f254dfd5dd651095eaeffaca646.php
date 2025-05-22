<section component="page-comments"
         option:page-comments:page-id="<?php echo e($page->id); ?>"
         option:page-comments:updated-text="<?php echo e(trans('entities.comment_updated_success')); ?>"
         option:page-comments:deleted-text="<?php echo e(trans('entities.comment_deleted_success')); ?>"
         option:page-comments:created-text="<?php echo e(trans('entities.comment_created_success')); ?>"
         option:page-comments:count-text="<?php echo e(trans('entities.comment_count')); ?>"
         class="comments-list"
         aria-label="<?php echo e(trans('entities.comments')); ?>">

    <div refs="page-comments@commentCountBar" class="grid half left-focus v-center no-row-gap">
        <h5 comments-title><?php echo e(trans_choice('entities.comment_count', count($page->comments), ['count' => count($page->comments)])); ?></h5>
        <?php if(count($page->comments) === 0 && userCan('comment-create-all')): ?>
            <div class="text-m-right" refs="page-comments@addButtonContainer">
                <button type="button" action="addComment"
                        class="button outline"><?php echo e(trans('entities.comment_add')); ?></button>
            </div>
        <?php endif; ?>
    </div>

    <div refs="page-comments@commentContainer" class="comment-container">
        <?php $__currentLoopData = $page->comments; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $comment): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo $__env->make('comments.comment', ['comment' => $comment], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>

    <?php if(userCan('comment-create-all')): ?>
        <?php echo $__env->make('comments.create', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        <?php if(count($page->comments) > 0): ?>
            <div refs="page-comments@addButtonContainer" class="text-right">
                <button type="button" action="addComment"
                        class="button outline"><?php echo e(trans('entities.comment_add')); ?></button>
            </div>
        <?php endif; ?>
    <?php endif; ?>

</section><?php /**PATH /var/www/bookstack/resources/views/comments/comments.blade.php ENDPATH**/ ?>